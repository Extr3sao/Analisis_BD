# Tutorial View Test

## Goal
Cubrir `TutorialView` con tests aislados para secciones principales, contenido de arquitectura y mapa de menus.

## Tasks
- [x] Crear test de arquitectura y troubleshooting -> Verify: renderiza cabecera, arquitectura, flujos y advertencias clave.
- [x] Crear test de mapa de menus y ejemplos -> Verify: aparecen modulos activos, endpoints y ejemplos end-to-end.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/views/TutorialView.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `TutorialView` queda cubierto para contenido estructural clave.
- [x] La validacion frontend sigue en verde.
