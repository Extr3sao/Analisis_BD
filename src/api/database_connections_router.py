from fastapi import APIRouter, HTTPException, Body
from typing import List, Dict, Any

from src.core.internal_db import InternalDBManager
from src.core.sqlite_paths import resolve_sqlite_path
from src.core.crypto_utils import encrypt_password, decrypt_password

# Initialize a new connection manager to the internal DB
internal_db = InternalDBManager(resolve_sqlite_path("INTERNAL_DB_PATH", "internal.db"))

router = APIRouter(prefix="/api/database-connections", tags=["Database Connections"])

@router.get("/")
def get_database_connections() -> List[Dict[str, Any]]:
    try:
        connections = internal_db.list_db_connections()
        # Mask passwords before sending to the frontend
        for conn in connections:
            if conn.get("password_encrypted"):
                conn["password_encrypted"] = "********"  # Masked
        return connections
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
def create_database_connection(payload: Dict[str, Any] = Body(...)):
    try:
        # Encrypt the plain text password from frontend
        plain_password = payload.pop("password", "")
        if plain_password:
            payload["password_encrypted"] = encrypt_password(plain_password)
        else:
            payload["password_encrypted"] = ""

        # Set default values if not provided
        if "ssl" not in payload:
            payload["ssl"] = 0
        if "is_active" not in payload:
            payload["is_active"] = 1

        new_id = internal_db.add_db_connection(payload)
        return {"success": True, "id": new_id, "message": "Connection created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{conn_id}")
def update_database_connection(conn_id: int, payload: Dict[str, Any] = Body(...)):
    try:
        # Check if the connection exists
        existing = internal_db.get_db_connection(conn_id)
        if not existing:
            raise HTTPException(status_code=404, detail="Connection not found")

        # Handle password logic: Only encrypt and update if a NEW password is provided and it's not the mask
        if "password" in payload:
            plain_password = payload.pop("password")
            if plain_password and plain_password != "********":
                payload["password_encrypted"] = encrypt_password(plain_password)
            else:
                # Keep the old encrypted password
                payload["password_encrypted"] = existing.get("password_encrypted", "")

        success = internal_db.update_db_connection(conn_id, payload)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to update connection")
            
        return {"success": True, "message": "Connection updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{conn_id}")
def delete_database_connection(conn_id: int):
    try:
        success = internal_db.delete_db_connection(conn_id)
        if not success:
            raise HTTPException(status_code=404, detail="Connection not found or already deleted")
            
        return {"success": True, "message": "Connection deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{conn_id}/test")
def test_database_connection(conn_id: int):
    try:
        # Fetch the real connection string from the database with the unmasked password
        existing = internal_db.get_db_connection(conn_id)
        if not existing:
            raise HTTPException(status_code=404, detail="Connection not found")
            
        db_type = existing.get("type", "oracle")
        host = existing.get("host")
        port = existing.get("port")
        db_name = existing.get("database")
        username = existing.get("username")
        encrypted_pass = existing.get("password_encrypted", "")
        
        # Decrypt password for testing
        password = decrypt_password(encrypted_pass) if encrypted_pass else ""
        
        # We only support Oracle for now in terms of actual db_manager connection testing
        if db_type.lower() == 'oracle':
            from src.core.db_manager import OracleDBManager
            
            # Temporary dict config mimicking env vars for the connection test
            config = {
                "ORACLE_HOST": host,
                "ORACLE_PORT": str(port),
                "ORACLE_SID": db_name,
                "ORACLE_USER": username,
                "ORACLE_PASSWORD": password
            }
            # Add ORACLE_CLIENT_LIB_DIR from environment if exists to support thick mode
            import os
            lib_dir = os.environ.get("ORACLE_CLIENT_LIB_DIR") or os.environ.get("ORACLE_HOME")
            if lib_dir:
                config["ORACLE_CLIENT_LIB_DIR"] = lib_dir
                
            try:
                # We initialize without a config_loader by monkeypatching or just doing a quick manual check
                # since OracleDBManager requires a ConfigLoader instance.
                # Here we just use the raw oracledb package to test.
                import oracledb
                
                # Check Thick mode logic
                if lib_dir and os.path.exists(lib_dir):
                    try:
                        abs_lib_dir = os.path.abspath(lib_dir)
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
                        
                        # Only initialize if not already initialized
                        try:
                            oracledb.init_oracle_client(lib_dir=abs_lib_dir)
                        except oracledb.ProgrammingError as e:
                            if "Oracle Client library has already been initialized" not in str(e):
                                raise
                    except Exception:
                        pass
                
                # Provar primer amb SERVICE_NAME (estàndard modern)
                try:
                    dsn = oracledb.makedsn(host, port, service_name=db_name)
                    connection = oracledb.connect(user=username, password=password, dsn=dsn)
                    connection.close()
                    return {"success": True, "message": "Connection to Oracle successful (Service Name)!"}
                except Exception as e_service:
                    # Fallback a SID si el Service Name falla
                    try:
                        dsn = oracledb.makedsn(host, port, sid=db_name)
                        connection = oracledb.connect(user=username, password=password, dsn=dsn)
                        connection.close()
                        return {"success": True, "message": "Connection to Oracle successful (SID)!"}
                    except Exception as e_sid:
                        return {"success": False, "message": f"Connection failed. ServiceName error: {str(e_service)}. SID error: {str(e_sid)}"}
            except Exception as e:
                return {"success": False, "message": f"Unexpected error: {str(e)}"}
        elif db_type.lower() == 'sqlite':
            import sqlite3
            try:
                conn = sqlite3.connect(database=db_name)
                conn.close()
                return {"success": True, "message": "Connection to SQLite successful!"}
            except Exception as e:
                return {"success": False, "message": f"Connection failed: {str(e)}"}
        else:
             return {"success": False, "message": f"Testing not fully implemented for DB type: {db_type}"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
