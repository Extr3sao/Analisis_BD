# AI Preview And Doc Backfill

## Goal
Generar una comparación no destructiva entre la explicación actual y la propuesta por IA, y hacer un backfill desde los documentos actuales para marcar `VIGENT/OK` en SQLite.

## Tasks
- [x] Añadir utilidades reutilizables para cargar/renderizar el catálogo funcional de checks. Verify: se puede reconstruir una sección `## CHECK_NN`.
- [x] Implementar backfill desde `auditoria_post_crq.md`, `consultes_post_crq.txt` y `EXPLICACION_CHECKS_CONTROL_QUALITAT_CRQ.md`. Verify: se crean/actualizan estados `VIGENT/OK` sin tocar los documentos.
- [x] Implementar script de preview IA no destructivo con diff frente al contenido actual. Verify: genera un informe con diferencias por check.
- [x] Ejecutar backfill y lanzar la preview IA. Verify: `/api/checks` deja de mostrar `PENDENT` por defecto y existe un informe de comparación.
- [x] Añadir tests relevantes. Verify: `pytest` pasa para el backfill.

## Done When
- [x] El estado de IA/sync refleja los documentos existentes y hay un informe comparativo de lo que propondría la IA sin sobrescribir nada.
