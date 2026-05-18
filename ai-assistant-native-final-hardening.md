# AI Assistant Native Final Hardening

## Goal
Tancar l'últim catch genèric de la branca nativa de `ai_assistant.py`.

## Tasks
- [x] Estrènyer `model.generate_content(...)` a errors de contracte/SDK -> Verify: tests natius existents
- [x] Verificar el mòdul focalitzat -> Verify: `pytest tests/test_ai_assistant.py tests/test_ai_integration.py`

## Done When
- [x] La branca nativa ja no depèn de `except Exception`
- [x] Les regressions continuen verdes
