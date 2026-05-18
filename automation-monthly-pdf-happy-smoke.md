# Automation Monthly Pdf Happy Smoke

## Goal
Ampliar `smoke:ui` para cubrir también la descarga feliz del `PDF mensual` del dashboard de automatizaciones.

## Tasks
- [x] Reutilizar el harness de descargas cliente para el `PDF mensual` -> Verify: el smoke construye el filename esperado a partir del `input[type="month"]`.
- [x] Insertar la aserción en el flujo feliz antes de pasar a `Jobs` -> Verify: la descarga se valida desde `Dashboard` y después el smoke navega a `Jobs`.
- [x] Ejecutar verificación -> Verify: `npm run smoke:ui`, `npm run lint`, `npx vitest run --reporter=dot`.

## Debugging Note
- Reproducción: `smoke:ui` falló primero porque `Automatitzacions` no siempre entraba en `Dashboard`, y después porque la aserción de `Jobs` seguía antes del cambio de pantalla.
- Aislamiento: la captura confirmó que el `PDF mensual` se validaba correctamente en `Dashboard`.
- Root cause: el harness asumía un estado interno y un orden de aserciones que ya no coincidían con el flujo real.
- Fix aplicado: navegar explícitamente a `Dashboard`, validar la descarga, y solo después cambiar a `Jobs`.

## Done When
- [x] `smoke:ui` cubre también el `PDF mensual` feliz de automatizaciones.
- [x] La validación frontend sigue en verde.
