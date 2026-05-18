# Automation History Retry Smoke

## Goal
Validar en navegador real el flujo feliz entre Històric y Reintents: encolar y ejecutar reintentos.

## Tasks
- [x] Hacer stateful los mocks de retry-queue y maintenance summary -> Verify: GET refleja POST/run-now
- [x] Extender el smoke feliz para encolar desde Històric y ejecutar en Reintents -> Verify: `npm run smoke:ui`
- [x] Revalidar lint y Vitest -> Verify: `npm run lint` y `npx vitest run --reporter=dot`

## Done When
- [x] El smoke feliz cubre la transición Històric -> Reintents sin romper la red de seguridad.
