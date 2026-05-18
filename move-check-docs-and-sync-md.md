# Move Check Docs And Sync MD

## Goal
Hacer que `Gestió de controls` edite las consultas reales de `auditoria_post_crq.md` y alojar ahí el panel documental operativo.

## Tasks
- [ ] Mezclar los datos de `/api/checks` con `/api/audit/post-crq/checks` en el frontend. Verify: al editar un check se carga la SQL del Markdown.
- [ ] Mover `Auditoria / Checks` a `ChecksAdminView` debajo del bloque de checks. Verify: el panel aparece en `Gestió de controls`.
- [ ] Retirar ese panel de `PostCrqAuditView`. Verify: `Auditoria de canvis` mantiene su flujo sin el editor documental.
- [ ] Actualizar tests del frontend para el nuevo flujo. Verify: `vitest` pasa en las vistas tocadas.

## Done When
- [ ] `Gestió de controls` usa el SQL visible en `auditoria_post_crq.md` como base de edición y contiene el panel documental operativo.
