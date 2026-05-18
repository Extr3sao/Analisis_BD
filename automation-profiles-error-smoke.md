# Automation Profiles Error Smoke

## Goal
Validar que Automatitzacions sigue operativa y degrada correctamente cuando falla la carga de perfiles.

## Tasks
- [x] Extender `profiles-error` para entrar en Automatitzacions -> Verify: el módulo carga en navegador real
- [x] Comprobar que el formulario de jobs no tiene perfiles disponibles y que el resto de datos sigue visible -> Verify: `npm run smoke:ui:profiles-error`
- [x] Revalidar lint y Vitest -> Verify: `npm run lint` y `npx vitest run --reporter=dot`

## Done When
- [x] `profiles-error` cubre Automatitzacions sin romper la red de seguridad.
