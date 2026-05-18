# post-crq-report-reuse-provider-smoke

## Goal
Evitar la reexecucio de l'auditoria Post-CRQ al descarregar informes i ampliar el smoke Oracle cap a la variant `provider`.

## Tasks
- [x] Aillar per que `reports` reexecutava Oracle i mesurar el cost real -> Verify: la ruta `POST /api/audit/post-crq/reports` crida `run_post_crq_audit(...)`.
- [x] Permetre que el backend reutilitzi `report_data` si el frontend ja ve del `run` -> Verify: la ruta genera PDF/ZIP sense obrir Oracle si rep `report_data` valid.
- [x] Fer que el frontend enviï el `result` Post-CRQ al descarregar informes -> Verify: el test de [PostCrqAuditView.test.jsx](C:\Users\45485456N\OneDrive - Generalitat de Catalunya\.....Antigravity\Dashboard E13BD\src\web-app\src\views\PostCrqAuditView.test.jsx) valida `report_data`.
- [x] Cobrir el contracte nou amb regressio backend -> Verify: [test_report_generation.py](C:\Users\45485456N\OneDrive - Generalitat de Catalunya\.....Antigravity\Dashboard E13BD\tests\test_report_generation.py) comprova que no es torna a cridar `run_post_crq_audit`.
- [x] Ampliar el smoke Oracle a `provider` quan hi hagi lots disponibles i deixar `skip` explicit si l'entorn no en retorna -> Verify: `npm run smoke:ui:oracle`.

## Done When
- [x] Les descàrregues `ZIP` i `general` no reexecuten Oracle si el `run` ja ha retornat `report_data`.
- [x] El smoke Oracle valida `run`, `ZIP`, `general` i gestiona `provider` amb traçabilitat real.
