# Checks Admin Final Hardening

## Goal
Tancar els dos `except Exception` restants de `checks_admin_router.py` en camins actius i barats de verificar.

## Tasks
- [x] Estrènyer rollback de `delete_check(...)` a errors de BBDD/fitxers -> Verify: test de rollback existent
- [x] Estrènyer la fase `explain` de `_regenerate_explanation(...)` -> Verify: regressions existents
- [x] Verificar el mòdul focalitzat -> Verify: `pytest tests/test_checks_admin_router.py`

## Done When
- [x] `checks_admin_router.py` ja no depèn d'aquests dos catches genèrics
- [x] Les regressions continuen verdes
