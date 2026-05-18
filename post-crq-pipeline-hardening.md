# Post CRQ Pipeline Hardening

## Goal
Eliminar debug residual y duplicación de constantes en `post_crq_pipeline.py`, con regresión del parsing temporal.

## Tasks
- [ ] Sustituir `print` de parsing por logging y limitar capturas a errores de fecha -> Verify: no quedan prints en el módulo
- [ ] Eliminar duplicación de `CRITICALITY_LABELS` y `CRITICALITY_ACTIONS` -> Verify: solo queda una definición por constante
- [ ] Añadir tests directos de `_parse_iso_dt` y `_resolve_time_window` -> Verify: pytest del módulo pasa
- [ ] Ejecutar compilación y bloque de tests relacionado -> Verify: `py_compile` y pytest verdes

## Done When
- [ ] `post_crq_pipeline` queda sin debug residual y con parsing temporal cubierto
