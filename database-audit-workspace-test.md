# Database Audit Workspace Test

## Goal
Cubrir `DatabaseAuditWorkspace` como composicion de subpestanas y encaminamiento interno.

## Tasks
- [x] Inspeccionar subtabs y props relevantes -> Verify: identificar vistas hijas y callbacks criticos.
- [x] Crear test dedicado de routing interno -> Verify: renderiza la vista correcta y cambia de subtab al pulsar botones.
- [x] Crear test de paso de props clave -> Verify: `PostCrqAuditView` y `DeepScanView` reciben las props esperadas.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/views/DatabaseAuditWorkspace.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `DatabaseAuditWorkspace` queda cubierto para composicion y routing interno.
- [x] La validacion frontend sigue en verde.
