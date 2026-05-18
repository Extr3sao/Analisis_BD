# Browser Error Smoke

## Goal
Endurecer el harness de navegador con escenarios de error controlado para Post-CRQ y correo sin depender del backend local.

## Tasks
- [x] Añadir selector de escenario al smoke y a los mocks -> Verify: el harness soporta `happy` y `error` sin duplicar scripts.
- [x] Validar mensajes de error visibles en Post-CRQ y Configuració del servidor -> Verify: el smoke de error fuerza fallos mockeados y comprueba los banners adecuados.
- [x] Exponer scripts npm y ejecutar verificación completa -> Verify: `lint`, `vitest`, `smoke:ui` y `smoke:ui:error` pasan.

## Done When
- [x] El proyecto tiene smoke browser feliz y smoke browser de error reproducibles.

