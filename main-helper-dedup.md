# Main Helper Dedup

## Goal
Eliminar redefiniciones peligrosas en `main.py` y verificar que el helper activo mantiene el comportamiento esperado.

## Tasks
- [ ] Consolidar `_to_float`, `_recommendation` y `_normalize_report_rows` en una sola definición activa -> Verify: no quedan redefiniciones duplicadas
- [ ] Endurecer `_to_float` para excepciones concretas -> Verify: mantiene fallback sin `except` amplio
- [ ] Añadir regresión directa del helper normalizador -> Verify: pytest focalizado pasa
- [ ] Ejecutar compilación y bloque backend relacionado -> Verify: `py_compile` y tests verdes

## Done When
- [ ] `main.py` no redefine esos helpers y el comportamiento actual queda cubierto
