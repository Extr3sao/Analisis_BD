# Report Builder AI Helper Hardening

## Goal
Treure la captura genèrica restant del helper IA compartit de `report_builder.py` sense canviar el fallback visible.

## Tasks
- [x] Estrènyer `_generate_ai_text(...)` a errors esperats del camí IA -> Verify: el helper continua retornant `None`
- [x] Afegir regressió directa del helper -> Verify: test unitari verd

## Done When
- [x] `report_builder.py` ja no usa `except Exception` al helper IA
- [x] Els builders continuen cobrint el fallback existent
