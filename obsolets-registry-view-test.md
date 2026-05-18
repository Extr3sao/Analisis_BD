# Obsolets Registry View Test

## Goal
Cubrir `ObsoletsRegistryView` con tests aislados para carga inicial, validacion y alta manual al registro.

## Tasks
- [x] Crear test de carga y alta manual -> Verify: `listObsolets` carga entradas y se vuelve a ejecutar tras `createObsolet`.
- [x] Crear test de validacion minima -> Verify: sin campos obligatorios se lanza `alert` y no se llama a `createObsolet`.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/views/ObsoletsRegistryView.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `ObsoletsRegistryView` queda cubierto para sus interacciones internas clave.
- [x] La validacion frontend sigue en verde.
