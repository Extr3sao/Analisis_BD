# Checks Admin View Test

## Goal
Cubrir `ChecksAdminView` con tests aislados para filtrado, detalle y alta de checks sin depender solo de la navegacion global.

## Tasks
- [x] Crear test de filtros y panel de detalle -> Verify: busqueda, estado, historial, sync y regeneracion funcionan sobre mocks locales.
- [x] Crear test de alta de check nuevo -> Verify: `axios.post('/api/checks', payload)` recibe `check_id` en mayusculas y `ordre` numerico.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/views/ChecksAdminView.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `ChecksAdminView` queda cubierto para interacciones internas clave.
- [x] La validacion frontend sigue en verde.
