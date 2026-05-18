# Main Oracle Runtime Hardening

## Goal
Reducir catches genéricos en `main.py` sobre creación de Oracle manager, `deep_scan`, `test_db` y el fallback PDF clásico.

## Tasks
- [x] Extraer helper seguro para crear `OracleDBManager` -> Verify: `deep_scan` y `dashboard` siguen funcionando con `dbm=None`
- [x] Aplicarlo a `deep_scan_handler`, `get_dashboard_stats` y `test_db` -> Verify: tests nuevos
- [x] Estrechar el fallback `classic_post_crq_pdf` -> Verify: detalle de stage sigue presente
- [x] Verificar con `py_compile` y `pytest` focalizado

## Done When
- [x] Estos caminos ya no dependen de `except Exception`
- [x] La regresión de `main.py` queda en verde
