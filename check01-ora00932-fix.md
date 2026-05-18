# CHECK_01 ORA-00932 fix

## Goal
Corregir el contracte SQL de CHECK_01 i deixar regressions que evitin que torni el `ORA-00932`.

## Tasks
- [x] Reproduir i aillar el contracte SQL trencat de dates a `post_crq_audit.py` -> Verify: reproduccio minima de SQL/binds per CHECK_01
- [x] Restaurar el contracte `TO_DATE(:start_date/:end_date)` i binds `YYYY-MM-DD` -> Verify: `py_compile` sense errors
- [x] Afegir regressio perque no torni `BETWEEN :START_DATE AND :END_DATE` -> Verify: `tests/test_post_crq_audit.py` verd
- [x] Reparar la regressio de mojibake que impedia validar criticitat/reporting -> Verify: mateixa suite focal en verd
- [x] Verificar el bloc ampliat de reporting relacionat -> Verify: `pytest tests/test_post_crq_audit.py tests/test_post_crq_wrapped_sql.py tests/test_check11_ai.py tests/test_report_generation.py -q`

## Done When
- [x] CHECK_01 ja no pot regressar al contracte SQL que provoca `ORA-00932`
- [x] Les proves focals i de reporting relacionat passen
