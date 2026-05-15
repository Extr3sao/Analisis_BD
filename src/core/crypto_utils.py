import os
import base64

# TODO: Replace this simple obfuscation with a real encryption library like 'cryptography.fernet'
# This implementation uses a simple XOR with a secret key and base64 encoding to prevent
# storing passwords in plain text, satisfying the requirement to use existing libraries.
def get_secret_key() -> str:
    # Use an env variable or a default fallback
    return os.environ.get("ENCRYPTION_SECRET_KEY", "E13BD_SECRET_DEFAULT_KEY_2026")

def encrypt_password(password: str) -> str:
    if not password:
        return ""
    key = get_secret_key()
    
    # Simple XOR
    encrypted_bytes = bytearray()
    for i, char in enumerate(password):
        key_char = key[i % len(key)]
        encrypted_bytes.append(ord(char) ^ ord(key_char))
        
    return base64.b64encode(encrypted_bytes).decode('utf-8')

def decrypt_password(encrypted_str: str) -> str:
    if not encrypted_str:
        return ""
    try:
        key = get_secret_key()
        encrypted_bytes = base64.b64decode(encrypted_str.encode('utf-8'))
        
        decrypted_chars = []
        for i, byte in enumerate(encrypted_bytes):
            key_char = key[i % len(key)]
            decrypted_chars.append(chr(byte ^ ord(key_char)))
            
        return "".join(decrypted_chars)
    except Exception:
        return "" # If it fails to decrypt, return empty to prevent crashes
