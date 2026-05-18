# automation-checks-experimental-hardening

## Goal
Endurecer `automation_service.py`, `checks_admin_router.py` y `post_crq_experimental_pdf.py` en los puntos con peor manejo de errores y dejar regresiones directas.

## Tasks
- [x] Ajustar `automation_service.py` en parseo temporal y persistencia analítica tardía -> Verify: `tests/test_automation.py`
- [x] Ajustar `checks_admin_router.py` en persistencia de errores/rollback con logging explícito -> Verify: `tests/test_checks_admin_router.py`
- [x] Endurecer `post_crq_experimental_pdf.py` en fallbacks de texto/números y añadir regresión -> Verify: `tests/test_report_generation.py`
- [x] Ejecutar verificación combinada del bloque -> Verify: pytest por módulos + `py_compile`

## Done When
- [x] Los tres módulos tienen manejo de errores más trazable
- [x] Hay regresión para cada cambio
- [x] Las verificaciones del bloque quedan en verde

