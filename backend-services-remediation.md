# Backend services audit remediation

## Goal
Aplicar los fixes de mayor riesgo detectados en backend y servicios, con regresiones verificables.

## Tasks
- [x] Activar foreign keys en SQLite managers -> Verify: cascadas reales en tests de automation store
- [x] Corregir delete_check para mantener tablas auxiliares alineadas -> Verify: test de renumeración + tablas auxiliares
- [x] Hacer delete_check tolerante a fallos entre DB y ficheros -> Verify: test que provoca fallo de escritura y comprueba rollback DB
- [x] Endurecer scheduler con logging y parada más limpia -> Verify: test que bloquea nuevos jobs al parar
- [x] Ejecutar verificación dirigida backend -> Verify: pytest de áreas afectadas en verde

## Done When
- [x] Los riesgos altos de integridad detectados en la auditoría quedan cubiertos por código y tests
