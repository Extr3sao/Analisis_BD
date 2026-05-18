# Post Crq Provider Download Smoke

## Goal
Ampliar `smoke:ui` para cubrir también la descarga feliz del report Post-CRQ por proveedor.

## Tasks
- [x] Añadir selección robusta de variante `provider` en el harness -> Verify: el smoke cambia el selector sin depender del orden visual de `select`.
- [x] Validar la descarga PDF por proveedor -> Verify: `playwright-smoke.mjs` espera `report_post_crq_E13DB.pdf`.
- [x] Ejecutar verificación -> Verify: `npm run smoke:ui`, `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `smoke:ui` cubre ZIP, `.txt` y PDF por proveedor en Post-CRQ.
- [x] La validación frontend sigue en verde.
