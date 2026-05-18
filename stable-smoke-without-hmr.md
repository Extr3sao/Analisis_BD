# stable-smoke-without-hmr

## Goal
Eliminar HMR del camino estable de regresión para que `run_project_regression.py` no dependa de `vite dev` durante los smokes.

## Tasks
- [ ] Hacer que `smoke:ui` use `vite preview` sobre `dist` -> Verify: smoke mocked
- [ ] Hacer que `smoke:ui:real` use FastAPI real sirviendo `dist`, sin proceso Vite -> Verify: smoke real
- [ ] Añadir `npm run build` al runner de proyecto antes de los smokes y actualizar README -> Verify: runner proyecto completo

## Done When
- [ ] El runner estable del proyecto pasa sin HMR en los smokes
