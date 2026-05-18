# Automation Jobs Smoke Lifecycle

## Goal
Validar en navegador real el ciclo de vida básico de Jobs dentro de Automatitzacions.

## Tasks
- [x] Hacer stateful los mocks de jobs -> Verify: GET refleja POST/PUT/DELETE
- [x] Extender el smoke feliz para crear, editar, ejecutar, activar/desactivar y borrar un job -> Verify: `npm run smoke:ui`
- [x] Revalidar lint y Vitest -> Verify: `npm run lint` y `npx vitest run --reporter=dot`

## Done When
- [x] El smoke feliz cubre el flujo principal de Jobs sin romper la red de seguridad.
