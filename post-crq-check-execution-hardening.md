# Post CRQ Check Execution Hardening

## Goal
Tancar el catch genèric del camí de negoci `_run_single_post_crq_check(...)` sense tocar el contracte d'error parcial del report.

## Tasks
- [x] Estrènyer la captura a errors de contracte/execució esperats -> Verify: regressió existent
- [x] Verificar el mòdul focalitzat -> Verify: `pytest tests/test_post_crq_audit.py`

## Done When
- [x] El camí de check individual ja no depèn de `except Exception`
- [x] El report continua acumulant errors parcials igual que abans
