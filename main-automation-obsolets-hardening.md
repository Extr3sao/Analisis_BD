# Main Automation + Obsolets Hardening

## Goal
Unificar el manejo de errores en endpoints de automatizacion y obsolets de `main.py` y corregir stages de logging inconsistentes.

## Tasks
- [ ] Sustituir wrappers `HTTPException(500, str(e))` por `_raise_internal_http_error(...)` → Verify: `py_compile`
- [ ] Corregir el stage equivocado de retry queue y añadir regresiones directas → Verify: `pytest tests/test_main_runtime.py -q`
- [ ] Ejecutar verificacion backend por bloques → Verify: `pytest` segmentado

## Done When
- [ ] Los endpoints de automation/obsolets usan stages de error correctos
- [ ] Hay tests directos del wrapping de errores en endpoints representativos
- [ ] La verificacion backend segmentada queda en verde
