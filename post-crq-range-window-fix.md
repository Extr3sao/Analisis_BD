# Post-CRQ range window fix

## Goal
Conservar l'hora exacta de la finestra `range` sense reobrir el bug SQL de `CHECK_01`.

## Tasks
- [x] Reproduir la p?rdua d'hores en `time_filter` normalitzat -> Verify: `_days_back_from_filter` retornava `00:00/23:59`
- [x] Mantenir doble contracte: dates pures per SQL i finestra exacta per display/filtrat -> Verify: `range_start_at/range_end_at` presents
- [x] Alinear `post_crq_pipeline` perqu? els reports usin la mateixa finestra -> Verify: `_resolve_time_window` suporta rangs amb hora exacta
- [x] Afegir regressions del cas `09:30 -> 08:30` -> Verify: `test_post_crq_audit.py` i `test_post_crq_pipeline.py` en verd
- [x] Verificar bloc ampliat Post-CRQ/reporting -> Verify: suite ampliada en verd

## Done When
- [x] `Finestra consultada` ja no s'expandeix a `00:00/23:59` quan l'usuari entra hores
- [x] `CHECK_01` continua mantenint el contracte SQL amb `TO_DATE(...)`
