# Automation Routes Templates Smoke

## Goal
Validar en navegador real la edición y persistencia de Destinataris y Plantilles dentro de Automatitzacions.

## Tasks
- [x] Hacer stateful los mocks de lot-routes y delivery-templates -> Verify: GET refleja PUT
- [x] Extender el smoke feliz para editar y guardar Destinataris y Plantilles -> Verify: `npm run smoke:ui`
- [x] Revalidar lint y Vitest -> Verify: `npm run lint` y `npx vitest run --reporter=dot`

## Done When
- [x] El smoke feliz cubre guardado visible de Destinataris y Plantilles sin romper la red de seguridad.
