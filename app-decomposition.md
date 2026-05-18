# App Decomposition

## Goal
Reducir `src/web-app/src/App.jsx` extrayendo la vista activa de deep scan a un componente propio sin cambiar comportamiento observable.

## Tasks
- [ ] Extraer `DeepScanView` a `src/web-app/src/views/DeepScanView.jsx` y pasarle solo los props necesarios -> Verify: `App.jsx` compila y la vista sigue renderizando.
- [ ] Simplificar `App.jsx` para delegar el bloque visual de deep scan al nuevo componente -> Verify: desaparece el bloque JSX gigante de deep scan del `App`.
- [ ] Ejecutar `npm run lint` y `npx vitest run --reporter=dot` en `src/web-app` -> Verify: lint limpio y suite en verde.

## Done When
- [ ] `App.jsx` es más pequeño, la pantalla de deep scan sigue operativa y la verificación del frontend pasa.
