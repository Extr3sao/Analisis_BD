# backend-deprecations-and-real-e2e

## Goal
Eliminar las deprecaciones backend actuales y añadir un smoke E2E con backend FastAPI real y datos temporales.

## Tasks
- [x] Migrar `src/api/main.py` de `on_event` a `lifespan` -> Verify: `pytest -q` sin warnings de `on_event`
- [x] Sustituir `utcnow()` por helpers UTC modernos en backend y tests -> Verify: `rg "utcnow\(" src tests` sin resultados relevantes
- [x] Revalidar backend completo -> Verify: `.venv\Scripts\python.exe -m pytest -q`
- [x] Añadir harness Playwright con backend real y SQLite temporal -> Verify: nuevo comando ejecutable
- [x] Ejecutar verificación final backend + E2E real -> Verify: comandos en verde

## Done When
- [x] Backend sin deprecaciones propias en la suite y smoke real funcional
