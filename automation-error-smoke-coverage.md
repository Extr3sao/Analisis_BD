# Automation Error Smoke Coverage

## Goal
Extender los smoke browser de error y carga para validar fallos controlados dentro de las pantallas internas de Automatitzacions.

## Tasks
- [x] Añadir mocks de error para reintentos, destinataris y plantilles -> Verify: `smokeApiMocks.mjs` distingue `error` y `load-error`
- [x] Extender `runErrorSmoke` para recorrer Automatitzacions y comprobar mensajes visibles -> Verify: `npm run smoke:ui:error`
- [x] Extender `runLoadErrorSmoke` para recorrer Automatitzacions y comprobar degradación visible -> Verify: `npm run smoke:ui:load-error`
- [x] Revalidar red de seguridad del frontend -> Verify: `npm run lint` y `npx vitest run --reporter=dot`

## Done When
- [x] Los escenarios `error` y `load-error` cubren errores internos de Automatitzacions y siguen pasando.
