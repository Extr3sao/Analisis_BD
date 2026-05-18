# Automation Export Error Smoke

## Goal
Endurecer `smoke:ui:error` para cubrir errores controlados en exportaciones `blob` del dashboard y del histórico de automatizaciones.

## Tasks
- [x] Añadir extracción robusta de errores desde respuestas `Blob` -> Verify: hooks de CSV/PDF usan `resolveRequestErrorMessage`.
- [x] Mockear fallos controlados de PDF mensual y CSV por run -> Verify: `smokeApiMocks.mjs` devuelve errores para escenario `error`.
- [x] Ampliar y ejecutar `smoke:ui:error` -> Verify: muestra `Fallo controlado PDF mensual` y `Fallo controlado export CSV`.
- [x] Ejecutar verificación general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Debugging Note
- Reproducción: `smoke:ui:error` falló al buscar `Dashboard`/`PDF mensual` dentro de `Automatitzacions`.
- Aislamiento: la navegación interna estaba bien; el selector del harness era demasiado estricto (`/^Dashboard$/i`) para un botón cuyo nombre accesible incluye también descripción.
- Root cause: asunción incorrecta del smoke sobre el nombre accesible del botón.
- Fix aplicado: selector relajado a `^Dashboard` y navegación explícita al dashboard antes de validar la exportación.

## Done When
- [x] El escenario `error` cubre exportaciones fallidas con feedback visible.
- [x] La validación frontend sigue en verde.
