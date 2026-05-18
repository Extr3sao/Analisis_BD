# Browser Profile Error Smoke

## Goal
Añadir un smoke de navegador para validar la degradación del shell cuando falla `/api/profiles`.

## Tasks
- [x] Extender mocks y harness con un escenario `profiles-error` -> Verify: el comando nuevo arranca sin duplicar scripts.
- [x] Validar shell visible, selector vacío y acción Post-CRQ deshabilitada -> Verify: la UI sigue montando aunque no haya perfiles.
- [x] Ejecutar verificación completa -> Verify: `lint`, `vitest` y todos los smokes pasan.

## Done When
- [x] El proyecto cubre también el fallo de carga de perfiles sin colapsar la SPA.

