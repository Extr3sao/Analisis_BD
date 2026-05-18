# Deep Scan View Test

## Goal
Cubrir `DeepScanView` con un test aislado de interacciones internas que no dependen del smoke global.

## Tasks
- [x] Crear test de seleccion de esquema y panel de scoring -> Verify: cambio de indice, apertura del panel y restauracion de defaults.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/views/DeepScanView.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `DeepScanView` queda cubierto para sus interacciones principales.
- [x] La validacion frontend sigue en verde.
