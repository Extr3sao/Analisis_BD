# Automation Service Analytics Safety

## Goal
Endurecer parsing temporal y persistencia analítica tardía en `automation_service.py` sin cambiar el contrato funcional.

## Tasks
- [ ] Limitar `parse_iso_utc` a errores de fecha esperables -> Verify: mantiene los casos válidos y devuelve `None` en inválidos
- [ ] Extraer helper seguro para persistencia analítica tardía con logging -> Verify: desaparece el `except ...: pass`
- [ ] Añadir regresión directa del helper seguro -> Verify: pytest del módulo pasa
- [ ] Ejecutar compilación y bloque de tests relacionado -> Verify: `py_compile` y pytest verdes

## Done When
- [ ] `automation_service` deja trazado el fallo de persistencia analítica y el parsing temporal queda acotado
