# Post CRQ View Test

## Goal
Cubrir `PostCrqAuditView` con tests aislados para interacciones internas que hoy no dependen solo del smoke de navegador.

## Tasks
- [x] Ampliar el test de variantes de descarga -> Verify: payload correcto para `all`, `provider` y `general`.
- [x] Anadir test de export de consultas y detalle tecnico -> Verify: callback `.txt` y toggle de tabla tecnica.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/views/PostCrqAuditView.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `PostCrqAuditView` queda cubierto para controles internos clave.
- [x] La validacion frontend sigue en verde.
