# post_crq exception hardening and helper consolidation

## Goal
Reducir riesgo en post_crq_audit endureciendo capturas de excepción y consolidando helpers de bajo riesgo en builders legacy.

## Tasks
- [x] Identificar captura amplia con impacto real en schema_lots
- [x] Extraer helper _load_schema_lot_mapping con manejo acotado de sqlite
- [x] Extraer helper _check_sort_key para builders legacy markdown/pdf
- [x] Añadir regresiones y revalidar suite dirigida del módulo

## Done When
- [x] schema_lots ya no depende de except globales duplicados
- [x] markdown/pdf legacy reutilizan helper común de ordenación y carga
