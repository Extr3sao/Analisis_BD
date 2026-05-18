# Post Crq Happy Download Smoke

## Goal
Cubrir en `smoke:ui` las descargas felices del report Post-CRQ y de las consultas exportadas `.txt`.

## Tasks
- [x] Añadir `query_export` al mock del run Post-CRQ -> Verify: el botón `Descarregar consultes (.txt)` queda habilitado.
- [x] Ampliar el smoke feliz con ZIP y `.txt` -> Verify: `playwright-smoke.mjs` espera ambas descargas.
- [x] Ejecutar verificación -> Verify: `npm run smoke:ui`, `npm run lint`, `npx vitest run --reporter=dot`.

## Debugging Note
- Reproducción: `smoke:ui` falló primero por nombre saneado del ZIP y después por la descarga cliente `.txt`.
- Aislamiento: el ZIP era una descarga real del navegador; el `.txt` se generaba en cliente con `Blob` + `anchor.click()` y el selector del botón estaba además mal escapado.
- Root cause: el harness trataba ambas descargas como equivalentes y usaba un regex incorrecto para el botón `.txt`.
- Fix aplicado: normalización de filename, instrumentación de descargas cliente en el harness y corrección del selector del botón.

## Done When
- [x] `smoke:ui` cubre las descargas felices de Post-CRQ.
- [x] La validación frontend sigue en verde.
