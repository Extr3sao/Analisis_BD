# Snapshots Export Test

## Goal
Cubrir `Exportar CSV` de `SnapshotsView` con un test aislado, ya que la pantalla legacy no es alcanzable desde la navegación actual.

## Tasks
- [x] Crear test de `SnapshotsView` con mocks de API y descarga cliente -> Verify: renderiza la captura activa y dispara la exportación CSV.
- [x] Ejecutar verificación focalizada -> Verify: `npx vitest run src/views/SnapshotsView.test.jsx --reporter=dot`.
- [x] Ejecutar verificación general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `SnapshotsView` queda cubierto para `Exportar CSV`.
- [x] La validación frontend sigue en verde.
