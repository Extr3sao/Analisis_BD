import oracledb
import os
import logging
import re

class OracleDBManager:
    def __init__(self, config):
        self.config = config
        self.connection = None
        self.last_error = None
        self._connect_failed = False
        self.logger = logging.getLogger(__name__)
        
        # Intentar inicialitzar mode Thick si es troba la ruta del client.
        lib_dir = (
            config.get("ORACLE_CLIENT_LIB_DIR")
            or os.getenv("ORACLE_CLIENT_LIB_DIR")
            or os.getenv("OCI_LIB_DIR")
        )
        if lib_dir and os.path.exists(lib_dir):
            try:
                # Assegurar ruta absoluta per evitar problemes amb caràcters especials
                abs_lib_dir = os.path.abspath(lib_dir)
                
                # Resoldre problemes de caràcters especials (com la 'ò' a Windows) utilitzant el short path
                if os.name == 'nt':
                    import ctypes
                    from ctypes import wintypes
                    _GetShortPathNameW = ctypes.windll.kernel32.GetShortPathNameW
                    _GetShortPathNameW.argtypes = [wintypes.LPCWSTR, wintypes.LPWSTR, wintypes.DWORD]
                    _GetShortPathNameW.restype = wintypes.DWORD
                    output_buf_size = _GetShortPathNameW(abs_lib_dir, None, 0)
                    if output_buf_size > 0:
                        output_buf = ctypes.create_unicode_buffer(output_buf_size)
                        _GetShortPathNameW(abs_lib_dir, output_buf, output_buf_size)
                        abs_lib_dir = output_buf.value

                oracledb.init_oracle_client(lib_dir=abs_lib_dir)
                self.logger.info(f"Oracle Thick Mode inicialitzat des de: {abs_lib_dir}")
            except Exception as e:
                # Capturar qualsevol error (inclòs UnicodeDecodeError) per no bloquejar l'arrencada
                self.logger.error(f"Avís: No s'ha pogut inicialitzar el mode Thick ({type(e).__name__}: {e}). Es farà servir el mode Thin.")

    def connect(self):
        """Estableix la connexió amb la base de dades amb fallback de Service Name a SID."""
        if self._connect_failed:
            # Si ja ha fallat en aquesta instància, no tornem a intentar-ho immediatament
            # per evitar esperes innecessàries, a menys que hagin passat més de 5 segons.
            pass

        user = self.config.get("USER")
        password = self.config.get("PASSWORD")
        dsn_raw = self.config.get("DSN")

        if not all([user, password, dsn_raw]):
            self.last_error = "Falten paràmetres de connexió (USER, PASSWORD, DSN)."
            return False

        # Intent 1: Connexió directa (tal com està al DSN)
        try:
            self.connection = oracledb.connect(user=user, password=password, dsn=dsn_raw)
            self._finalize_connection()
            return True
        except Exception as e_direct:
            error_str = str(e_direct)
            self.logger.warning(f"Intent de connexió directa fallit per {dsn_raw}: {error_str}")
            
            # Si l'error suggereix problemes de resolució del Service Name/SID, intentem el fallback
            # ORA-12505: SID not found
            # ORA-12514: TNS:listener does not currently know of service requested
            if any(code in error_str for code in ["ORA-12505", "ORA-12514"]) or "/" in dsn_raw:
                self.logger.info("Detectat possible error de Service Name/SID. Provant formats alternatius...")
                
                # Intentar descompondre host:port/db_name
                try:
                    # El regex gestiona host:port/name i també host:port:name
                    match = re.match(r"^([^:/]+):(\d+)[/|:](.+)$", dsn_raw)
                    if match:
                        host, port, db_name = match.groups()
                        
                        # Intent 2: Forçar Service Name
                        try:
                            dsn_service = oracledb.makedsn(host, port, service_name=db_name)
                            self.connection = oracledb.connect(user=user, password=password, dsn=dsn_service)
                            self.logger.info(f"Connectat amb èxit a {host}:{port} via Service Name ({db_name}).")
                            self._finalize_connection()
                            return True
                        except Exception as e_s:
                            self.logger.debug(f"Service Name ha fallat per {db_name}: {e_s}")
                            
                            # Intent 3: Forçar SID
                            try:
                                dsn_sid = oracledb.makedsn(host, port, sid=db_name)
                                self.connection = oracledb.connect(user=user, password=password, dsn=dsn_sid)
                                self.logger.info(f"Connectat amb èxit a {host}:{port} via SID ({db_name}).")
                                self._finalize_connection()
                                return True
                            except Exception as e_sid:
                                self.last_error = f"Error en connectar (Service Name i SID han fallat). Últim error: {e_sid}"
                    else:
                        self.last_error = error_str
                except Exception as e_parse:
                    self.last_error = f"Error en analitzar el DSN: {e_parse}. Error original: {error_str}"
            else:
                self.last_error = error_str

            self._connect_failed = True
            self.logger.error(f"Error en connectar a Oracle ({dsn_raw}): {self.last_error}")
            return False

    def _finalize_connection(self):
        """Configuracions post-connexió (timeouts, etc.)."""
        if not self.connection:
            return
            
        timeout_ms = self.config.get("CALL_TIMEOUT_MS")
        if timeout_ms:
            try:
                self.connection.call_timeout = int(timeout_ms)
            except (AttributeError, TypeError, ValueError):
                self.logger.warning("No s'ha pogut aplicar CALL_TIMEOUT_MS=%s", timeout_ms)
        
        self.last_error = None
        self._connect_failed = False
        # self.logger.info("Connexió Oracle finalitzada correctament.")

    def execute_query(self, query, params=None):
        """Executa una consulta SQL i retorna els resultats i les capçaleres."""
        if not self.connection:
            if not self.connect():
                return None, None
        
        try:
            with self.connection.cursor() as cursor:
                safe_params = self._filter_params_for_query(query, params)
                cursor.execute(query, safe_params)
                columns = [col[0] for col in cursor.description]
                data = cursor.fetchall()
                self.last_error = None
                return data, columns
        except (oracledb.Error, RuntimeError, TypeError, ValueError) as e:
            self.last_error = str(e)
            self.logger.error(f"Error executant consulta: {e}")
            self.close()
            return None, None

    @staticmethod
    def _strip_sql_comments(query: str) -> str:
        """Elimina comentaris SQL per evitar apostrofs i placeholders falsos en la deteccio de binds."""
        if not query:
            return ""
        without_block = re.sub(r"/\*.*?\*/", " ", query, flags=re.DOTALL)
        return re.sub(r"--.*?$", " ", without_block, flags=re.MULTILINE)

    @staticmethod
    def _strip_string_literals(query: str) -> str:
        """Elimina el contingut de strings literals SQL ('...') per evitar falsos positius."""
        return re.sub(r"'[^']*'", "''", query or "")

    @staticmethod
    def _filter_params_for_query(query, params):
        if not params:
            return {}
        
        uncommented_query = OracleDBManager._strip_sql_comments(query or "")
        clean_query = OracleDBManager._strip_string_literals(uncommented_query)
        
        query_binds = re.findall(r":([A-Za-z_][A-Za-z0-9_]*)", clean_query)
        normalized_query_binds = {name.lower(): name for name in query_binds}
        
        if not normalized_query_binds:
            return {}

        safe_params = {}
        normalized_user_params = {k.lower(): (k, v) for k, v in params.items()}
        
        for norm_bind, original_bind_name in normalized_query_binds.items():
            if norm_bind in normalized_user_params:
                _, value = normalized_user_params[norm_bind]
                safe_params[original_bind_name] = value
                
        return safe_params

    def close(self):
        """Tanca la connexió."""
        if self.connection:
            try:
                self.connection.close()
                self.logger.info("Connexió tancada.")
            finally:
                self.connection = None
