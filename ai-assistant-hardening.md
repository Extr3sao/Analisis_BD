# AI Assistant Hardening

## Goal
Eliminar prints de debug y endurecer el fallback OpenRouter de `AIAssistant` con regresiones directas.

## Tasks
- [ ] Sustituir prints por logging estructurado en `ai_assistant.py` -> Verify: no quedan prints en el módulo
- [ ] Limitar capturas a errores de red/parsing donde sea razonable sin cambiar el fallback funcional -> Verify: el flujo sigue devolviendo texto o mensaje de error estable
- [ ] Añadir tests directos del fallback OpenRouter y de `get_models` -> Verify: pytest del módulo pasa
- [ ] Ejecutar compilación y bloque de tests relacionado -> Verify: `py_compile` y pytest verdes

## Done When
- [ ] `AIAssistant` ya no usa prints de debug y el fallback OpenRouter queda cubierto
