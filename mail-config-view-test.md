# Mail Config View Test

## Goal
Cubrir `MailConfigView` con tests aislados para guardado normalizado y test SMTP, sin depender de la suite mixta de automatizaciones.

## Tasks
- [x] Crear test de guardado con payload normalizado -> Verify: `updateDeliveryConfig` y `updateDeliveryRoutes` reciben arrays y rutas saneadas.
- [x] Crear test de prueba SMTP con validacion y error backend -> Verify: bloquea envio vacio y muestra error funcional al fallar el backend.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/views/MailConfigView.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `MailConfigView` queda cubierto para guardado y test SMTP.
- [x] La validacion frontend sigue en verde.
