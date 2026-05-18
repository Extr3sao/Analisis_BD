# Main Runtime Hardening

## Goal
Endurecer `main.py` en configuración IA y deep-scan para evitar cierres perdidos, `print` legacy y fallos silenciosos.

## Tasks
- [ ] Sustituir `print/traceback` por logging en `get_config`, `deep_scan_handler`, `dashboard-stats` e insights → Verify: `py_compile`
- [ ] Garantizar `dbm.close()` en rutas deep-scan/dashboard también cuando hay error → Verify: tests async directos
- [ ] Ejecutar verificación backend ampliada del bloque → Verify: `pytest` por bloques

## Done When
- [ ] Las rutas endurecidas dejan trazas estructuradas y no fugan conexión Oracle
- [ ] Hay regresiones directas para `deep_scan_handler` y `dashboard-stats`
- [ ] La verificación backend del bloque queda en verde
