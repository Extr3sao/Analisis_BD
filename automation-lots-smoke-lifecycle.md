# Automation Lots Smoke Lifecycle

## Goal
Validar en navegador real el flujo principal de Lots i mapatge: validación, guardado y backfill.

## Tasks
- [x] Hacer stateful los mocks de schema-lots, master-lots y backfill -> Verify: GET refleja PUT/preview/apply
- [x] Extender el smoke feliz para cubrir duplicados, guardado y backfill -> Verify: `npm run smoke:ui`
- [x] Revalidar lint y Vitest -> Verify: `npm run lint` y `npx vitest run --reporter=dot`

## Done When
- [x] El smoke feliz cubre el flujo principal de Lots i mapatge sin romper la red de seguridad.
