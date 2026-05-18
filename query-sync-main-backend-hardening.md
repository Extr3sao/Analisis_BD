# Query Sync + Main Backend Hardening

## Goal
Cerrar el estado de sincronización de `QuerySyncService`, endurecer `main.py` en rutas de reportes y verificar el bloque backend afectado.

## Tasks
- [x] Añadir test directo de `QuerySyncService` para `explicacio_check` → Verify: `pytest tests/test_query_sync_service.py -q`
- [x] Extraer helpers de timestamp/streaming en `main.py` para reportes Post-CRQ → Verify: tests de `test_report_generation.py`
- [x] Ejecutar verificación focalizada del backend tocado → Verify: `py_compile` + `pytest` del bloque

## Done When
- [x] `QuerySyncService` deja `explicacio_check` en `OK/ERROR` según resultado real
- [x] Las rutas de reportes usan timestamp UTC homogéneo sin duplicar streaming boilerplate
- [x] La verificación del backend tocado queda en verde
