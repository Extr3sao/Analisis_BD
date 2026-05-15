import oracledb
import os
import sys
from dotenv import load_dotenv

# Afegir src al path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from src.core.config_loader import ConfigLoader

def test_thick_mode():
    print("--- Diagnòstic de Connexió Oracle ---")
    
    # 1. Carregar configuració
    cl = ConfigLoader()
    profile_name = cl.get_env_var("DEFAULT_PROFILE", "E13DB")
    profile = cl.get_profile(profile_name)
    
    if not profile:
        print(f"ERROR: No s'ha trobat el perfil {profile_name}")
        return

    lib_dir = profile.get("ORACLE_CLIENT_LIB_DIR")
    print(f"Intentant usar Instant Client a: {lib_dir}")
    
    if not lib_dir or not os.path.exists(lib_dir):
        print(f"ERROR: La ruta de l'Instant Client no existeix o és buida.")
        return

    # 2. Intentar inicialitzar Thick Mode
    try:
        oracledb.init_oracle_client(lib_dir=lib_dir)
        print("SUCCESS: oracledb.init_oracle_client() ejecutado correctamente.")
    except Exception as e:
        print(f"ERROR Thick Mode: {e}")
        return

    # 3. Intentar connexió
    try:
        print(f"Conectando a {profile['DSN']} con usuario {profile['USER']}...")
        conn = oracledb.connect(
            user=profile['USER'],
            password=profile['PASSWORD'],
            dsn=profile['DSN']
        )
        print("OK: CONEXION ESTABLECIDA CON EXITO!")
        
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM v$version")
            res = cursor.fetchone()
            print(f"Version BBDD: {res[0]}")
            
        conn.close()
    except Exception as e:
        print(f"FAIL: ERROR DE CONEXION: {str(e).encode('ascii', 'ignore').decode()}")

if __name__ == "__main__":
    test_thick_mode()
