# Browser Load Error Smoke

## Goal
Añadir un tercer smoke de navegador para validar errores de carga inicial en Post-CRQ y Configuració del servidor.

## Tasks
- [x] Extender el harness y los mocks con un escenario `load-error` -> Verify: el comando acepta el nuevo escenario sin duplicar scripts.
- [x] Validar banners visibles de error en Post-CRQ y Mail Config -> Verify: el smoke fuerza fallos en cargas GET y encuentra los mensajes esperados.
- [x] Ejecutar verificación completa -> Verify: `npm run lint`, `npx vitest run --reporter=dot`, `npm run smoke:ui`, `npm run smoke:ui:error` y `npm run smoke:ui:load-error` pasan.

## Done When
- [x] El proyecto cubre smoke feliz, smoke de error operativo y smoke de error de carga inicial.

