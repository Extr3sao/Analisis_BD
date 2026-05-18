# Browser Smoke Harness

## Goal
Añadir un smoke reproducible de navegador real para validar navegación y flujos visibles de la SPA sin depender del backend local.

## Tasks
- [x] Añadir dependencia y script de smoke con Playwright + arranque controlado de Vite -> Verify: existe un comando único ejecutable desde `src/web-app`.
- [x] Implementar mocks HTTP mínimos y recorrido UI de subpantallas críticas -> Verify: el script recorre la app, abre ayuda y ejecuta acciones reales con red mockeada.
- [x] Ejecutar lint, Vitest y el smoke de navegador -> Verify: las tres comprobaciones pasan.

## Done When
- [x] El repo tiene una comprobación browser smoke reproducible y ejecutable sin backend local.

