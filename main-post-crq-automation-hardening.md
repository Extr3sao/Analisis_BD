# Main Post-CRQ Automation Hardening

## Goal
Cerrar el endurecimiento del runtime backend activo en main, post-CRQ y automatizaciones con regresiones directas.

## Tasks
- [x] Refactorizar `main.py` para reutilizar helpers de error y ciclo Oracle en rutas activas -> Verify: `python -m py_compile src\\api\\main.py`
- [x] Unificar bloques IA legacy en `report_builder.py` con `_generate_ai_text` -> Verify: `python -m py_compile src\\api\\report_builder.py`
- [x] Endurecer `post_crq_audit.py` en parse temporal, fallback PDF y trazabilidad por check -> Verify: `python -m py_compile src\\api\\post_crq_audit.py`
- [x] Añadir regresiones en `test_main_runtime.py`, `test_post_crq_audit.py` y `test_report_generation.py` -> Verify: `pytest tests\\test_main_runtime.py tests\\test_post_crq_audit.py tests\\test_report_generation.py -q`
- [x] Añadir logging dirigido en `automation_service.py` para fallos de entrega y retry -> Verify: `pytest tests\\test_automation.py -q`

## Done When
- [x] `main.py`, `report_builder.py`, `post_crq_audit.py` y `automation_service.py` quedan verificados por compile + pytest focalizado
