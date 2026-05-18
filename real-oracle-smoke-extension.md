# real-oracle-smoke-extension

## Goal
Ampliar el smoke real con descargas/mutaciones reales y dejar preparado un harness Oracle opt-in para deep scan y post-CRQ.

## Tasks
- [x] Revisar [playwright-smoke-real.mjs](C:\Users\45485456N\OneDrive - Generalitat de Catalunya\.....Antigravity\Dashboard E13BD\src\web-app\scripts\playwright-smoke-real.mjs) y ubicar los puntos exactos para ampliar el flujo -> Verify: localizar bloques de histórico, destinatarios, plantillas y reglas/tareas.
- [x] Añadir descargas reales y mutaciones persistidas al smoke real -> Verify: `npm run smoke:ui:real` pasa.
- [x] Si aparece una regresión del harness, aislarla y corregirla antes de seguir -> Verify: rerun del smoke real en verde.
- [x] Crear [playwright-smoke-oracle.mjs](C:\Users\45485456N\OneDrive - Generalitat de Catalunya\.....Antigravity\Dashboard E13BD\src\web-app\scripts\playwright-smoke-oracle.mjs) con precheck Oracle, backend temporal y Vite temporal -> Verify: script arranca y falla rápido con mensaje claro si faltan variables.
- [x] Añadir el script npm y documentar uso real y prerequisitos en [README.md](C:\Users\45485456N\OneDrive - Generalitat de Catalunya\.....Antigravity\Dashboard E13BD\README.md) -> Verify: `package.json` y README reflejan el nuevo flujo.
- [x] Verificar frontend y harness Oracle preparado -> Verify: `npm run lint` y `npm run smoke:ui:oracle` o fallo rápido controlado.

## Done When
- [x] El smoke real cubre descargas y mutaciones reales adicionales.
- [x] El smoke Oracle queda listo para ejecución controlada con variables de entorno.
