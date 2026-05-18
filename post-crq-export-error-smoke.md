# Post Crq Export Error Smoke

## Goal
Cubrir en `smoke:ui:error` el fallo de descarga del report Post-CRQ, incluyendo la propagación correcta del detalle backend desde respuestas `blob` y su verificación vía `alert`.

## Tasks
- [x] Añadir manejo de error `blob` al report Post-CRQ -> Verify: `PostCrqAuditView.jsx` usa `resolveRequestErrorMessage`.
- [x] Mockear `/api/audit/post-crq/reports` para camino feliz/error -> Verify: `smokeApiMocks.mjs` responde ZIP/PDF o `Fallo controlado report Post-CRQ`.
- [x] Capturar y verificar `alert` en el harness -> Verify: `playwright-smoke.mjs` guarda mensajes de diálogo y espera el mensaje esperado.
- [x] Ejecutar verificación -> Verify: `npm run smoke:ui:error`, `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `smoke:ui:error` cubre también la descarga fallida del report Post-CRQ.
- [x] La validación frontend sigue en verde.
