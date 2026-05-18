# Report Timestamp UTC

## Goal
Normalizar timestamps de generación de PDF/reporting a UTC en módulos de reporting activos.

## Tasks
- [ ] Introducir helpers UTC en `automation_analytics_pdf.py` y `report_builder.py` -> Verify: no quedan `datetime.now()` naïf en esos módulos
- [ ] Añadir regresión focalizada de los helpers de timestamp -> Verify: pytest focalizado pasa
- [ ] Ejecutar compilación y bloque de reportes relacionado -> Verify: `py_compile` y pytest verdes

## Done When
- [ ] reporting activo usa timestamps UTC y queda cubierto
