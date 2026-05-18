# Automation Copy Cleanup

## Goal
Corregir mojibake y mensajes visibles en Automatitzacions sin tocar lógica funcional.

## Tasks
- [x] Corregir copy visible en config y utilidades -> Verify: textos visibles legibles en UI
- [x] Corregir mensajes de feedback y normalización legacy en hooks -> Verify: mensajes y compatibilidad de localStorage coherentes
- [x] Revalidar smoke, lint y Vitest -> Verify: `npm run smoke:ui`, `npm run lint`, `npx vitest run --reporter=dot`

## Done When
- [x] La UI activa de Automatitzacions ya no muestra mojibake relevante y la red de seguridad sigue en verde.
