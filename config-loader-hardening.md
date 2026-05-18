# Config Loader Hardening

## Goal
Endurecer la persistencia de perfiles y `.env` en `ConfigLoader` con comportamiento determinista, logging y regresiones directas.

## Tasks
- [ ] Reproducir y aislar el comportamiento actual de `save_connection`/`save_env_var` y definir el cambio mínimo seguro -> Verify: evidencia en código y comportamiento observado
- [ ] Implementar `save_connection` como upsert normalizado con logging estructurado -> Verify: el fichero no duplica perfiles y conserva el formato esperado
- [ ] Sustituir `print` por logger en errores de persistencia y mantener `save_env_var` determinista -> Verify: código compila y rutas devuelven `False` en fallo
- [ ] Añadir tests directos para carga, resolución tolerante, upsert de perfiles y actualización de `.env` -> Verify: pytest del módulo en verde
- [ ] Ejecutar verificación focalizada y dejar traza del trabajo -> Verify: `py_compile` y pytest relevantes pasan

## Done When
- [ ] `ConfigLoader` no duplica perfiles al guardar, usa logging y tiene regresiones directas
