# App Shell Final Refactor

## Goal
Dejar `App.jsx` como contenedor de composición, moviendo constantes y resolución de ayuda a un módulo aparte y verificando que el frontend sigue estable.

## Tasks
- [x] Crear un módulo de configuración con defaults de deep scan, post-CRQ y resolución de ayuda -> Verify: `App.jsx` importa desde ese módulo y compila.
- [x] Simplificar `App.jsx` para consumir la nueva configuración y eliminar definición local duplicada -> Verify: el archivo baja de responsabilidad sin cambiar props ni flujo visible.
- [x] Ejecutar verificación frontend completa -> Verify: `npm run lint` y `npx vitest run --reporter=dot` pasan.

## Done When
- [x] `App.jsx` queda como shell/orquestador sin defaults embebidos.

