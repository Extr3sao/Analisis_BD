# DB Manager Hardening

## Goal
Endurecer `OracleDBManager` para que no reutilice conexiones Oracle rotas y pueda recuperarse tras fallos de ejecución.

## Tasks
- [ ] Cerrar y limpiar la conexion si `execute_query` falla → Verify: tests directos
- [ ] Hacer `close()` idempotente y limpiar `self.connection` → Verify: tests directos
- [ ] Ejecutar verificacion del bloque backend → Verify: `pytest` segmentado

## Done When
- [ ] Una consulta fallida no deja una conexion rota reutilizable
- [ ] `close()` deja el manager en estado consistente
- [ ] La verificacion del bloque queda en verde
