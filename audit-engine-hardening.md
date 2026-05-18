# Audit Engine Hardening

## Goal
Endurecer conversiones y ejecución de queries en `AuditEngine` con regresión directa.

## Tasks
- [ ] Limitar `_as_number` a errores de conversión -> Verify: mantiene fallback sin `except` amplio
- [ ] Añadir tests para `_run_query` filtrando binds y para errores opcionales -> Verify: pytest del módulo pasa
- [ ] Ejecutar compilación y bloque de tests relacionado -> Verify: `py_compile` y pytest verdes

## Done When
- [ ] `AuditEngine` queda cubierto para bind filtering y fallback numérico
