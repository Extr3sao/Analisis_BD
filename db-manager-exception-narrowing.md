# DB Manager Exception Narrowing

## Goal
Reducir capturas amplias en `db_manager.py` manteniendo el comportamiento ya cubierto por tests.

## Tasks
- [ ] Acotar excepciones de inicialización, conexión, timeout y ejecución -> Verify: comportamiento externo no cambia
- [ ] Reejecutar tests directos y bloque backend corto -> Verify: pytest verde

## Done When
- [ ] `db_manager.py` solo captura errores Oracle/validación esperables
