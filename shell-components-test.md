# Shell Components Test

## Goal
Cubrir los componentes globales del shell: navegacion superior, skip-link y cabecera de pagina.

## Tasks
- [x] Inspeccionar props y comportamiento visible -> Verify: identificar accesibilidad, callbacks y ramas de render.
- [x] Crear test de `AppShellChrome` -> Verify: cubre skip-link, selector de perfil y navegacion principal.
- [x] Crear test de `AppPageHeader` -> Verify: cubre ayuda contextual, refresco y visibilidad del boton de informe.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/components/AppShellChrome.test.jsx src/components/AppPageHeader.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] Los componentes globales del shell quedan cubiertos.
- [x] La validacion frontend sigue en verde.
