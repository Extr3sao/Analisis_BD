# Sync Check Sources From MD

## Goal
Sincronizar SQLite con `auditoria_post_crq.md`, dando prioridad al Markdown para que `Gestió de controls` y la auditoría Post-CRQ expongan el mismo catálogo.

## Tasks
- [x] Añadir sincronización backend desde Markdown antes de listar o leer checks. Verify: `/api/checks` devuelve el mismo set que el MD.
- [x] Marcar como inactivos los checks huérfanos de SQLite y crear/actualizar los que existan en el MD. Verify: `CHECK_11` aparece y `CHECK_13` desaparece del listado activo.
- [x] Añadir tests backend para la resincronización y ajustar el test frontend afectado. Verify: `pytest` y `vitest` pasan en las áreas tocadas.

## Done When
- [x] El catálogo activo de `/api/checks` queda alineado con `auditoria_post_crq.md` y el frontend edita las consultas del MD sin desajustes.
