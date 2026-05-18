# Internal DB Meta Normalization

## Goal
Normalitzar els camps clau de `meta_objects` per evitar inconsistències de filtre i llistat.

## Tasks
- [ ] Afegir helper de normalització a `InternalDBManager` per a camps de meta objects → Verify: `py_compile`
- [ ] Aplicar la normalització a `add_meta_object` i `update_meta_object` → Verify: tests directes
- [ ] Executar verificació backend del bloc afectat → Verify: `pytest` per blocs

## Done When
- [ ] `meta_objects` persisteix `schema_name`, `object_type`, `risk_level` i `source` en format consistent
- [ ] Hi ha regressió directa de normalització en inserció i actualització
- [ ] La verificació del bloc queda en verd
