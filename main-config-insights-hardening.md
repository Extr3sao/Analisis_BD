# Main Config Insights Hardening

## Goal
Treure captures genèriques innecessàries de `main.py` a la configuració IA i al resum d'insights, mantenint el mateix fallback visible.

## Tasks
- [x] Endurir `get_config` i la càrrega del catàleg OpenRouter amb helper comú -> Verify: fallback segueix sent `openrouter/free`
- [x] Endurir `_get_api_insights` amb errors esperats i mantenir retorn `"IA no disponible."` -> Verify: test unitari
- [x] Afegir regressions i verificar -> Verify: `py_compile` i `pytest` focalitzat verd

## Done When
- [x] `main.py` no depèn de `except Exception` en aquests dos camins
- [x] Les regressions noves passen
