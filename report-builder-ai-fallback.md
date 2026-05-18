# Report Builder AI Fallback

## Goal
Consolidar el fallback de IA opcional en `report_builder.py` con logging y regresión directa.

## Tasks
- [ ] Extraer helper común para generación IA opcional -> Verify: menos duplicación y fallback consistente
- [ ] Sustituir capturas inline por logging estructurado -> Verify: los informes siguen degradando sin romperse
- [ ] Añadir test directo del helper -> Verify: pytest focalizado pasa
- [ ] Ejecutar compilación y bloque de reportes -> Verify: `py_compile` y pytest verdes

## Done When
- [ ] `report_builder` ya no repite bloques de IA con manejo inconsistente de error
