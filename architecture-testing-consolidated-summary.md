# Consolidated Technical Summary

## Current Architecture
- `src/web-app/src/App.jsx`: shell principal y orquestación mínima.
- `src/web-app/src/views/DatabaseAuditWorkspace.jsx`: composición de subpantallas de `Auditoria BBDD`.
- `src/web-app/src/views/AutomationView.jsx`: composición del módulo de automatizaciones.
- Hooks de dominio separados para `deep scan`, `post-crq`, shell global y automatizaciones.

## Download Caching
- `src/web-app/src/views/PostCrqAuditView.jsx`: reutiliza `report_data` del run y cachea descargas repetidas por variante.
- `src/web-app/src/hooks/useGlobalReport.js`: cachea `Generar Informe` global en la misma sesión.
- `src/web-app/src/hooks/useAutomationAnalytics.js`: cachea `PDF mensual`.
- `src/web-app/src/hooks/useAutomationHistoryRetries.js`: cachea `automation_run_*_lots.csv`.
- `src/web-app/src/views/SnapshotsView.jsx`: cachea `snapshot_export_*.csv`.
- `src/web-app/src/hooks/usePostCrqAudit.js`: cachea el `.txt` de consultas exportadas.

## Smoke Harnesses
- `src/web-app/scripts/smokeRuntime.mjs`: runtime compartido para `launchBrowser`, `startProcess`, `closeProcess` y reintentos de arranque.
- `src/web-app/scripts/playwright-smoke.mjs`: smoke mockeado con reintentos automáticos de Vite.
- `src/web-app/scripts/playwright-smoke-real.mjs`: smoke con FastAPI real + SQLite temporal, reintentos de seed, backend y Vite.
- `src/web-app/scripts/playwright-smoke-oracle.mjs`: smoke opt-in con Oracle real, reintentos de backend/Vite y validación `provider` real.

## Verification Status
- Frontend lint: OK
- Vitest: 66 passed, 26 files passed
- Backend pytest monolític: 194 passed
- `smoke:ui`: OK
- `smoke:ui:real`: OK
- `smoke:ui:oracle`: OK en entorno con variables Oracle reales
- `run_project_regression.py`: OK en `stable` y `full`

## Residual Notes
- Los clicks de descarga cliente en tests quedan interceptados en `src/web-app/src/test/setupTests.js`, evitando ruido de `jsdom`.
- `AutomationHelpView.test.jsx` quedó estabilizado comprobando shell + fallback, no la resolución interna del `lazy`, para evitar flakiness de suite.
- La fase de endurecimiento de testing puede darse por cerrada; el siguiente cambio razonable ya debería venir de un requisito funcional nuevo, no de seguir ampliando infraestructura de pruebas.
