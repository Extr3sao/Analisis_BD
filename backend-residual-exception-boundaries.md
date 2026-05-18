# Backend Residual Exception Boundaries

## Goal
Deixar traçat què queda amb `except Exception` al runtime actiu i per què ja no convé seguir-lo estrenyent sense canviar semàntica.

## Residuals classificats
- `src/api/main.py`
  - `_run_with_internal_http_error(...)`
  - `_run_with_oracle_profile(...)`
  - `_read_repo_text_file(...)`
  - Motiu: wrappers de frontera HTTP. Han de capturar qualsevol error no controlat i convertir-lo a `HTTPException(500)`.

- `src/api/automation_service.py`
  - `_run_loop(...)`
  - `execute_job(...)`
  - alguns punts de lliurament/regles/retries d'alt nivell
  - Motiu: fronteres de scheduler i de job orchestration. Han de preservar el servei, tancar runs i registrar error encara que la causa sigui heterogènia.

- `src/api/post_crq_audit.py`
  - fallbacks de ReportLab/PDF
  - fallbacks finals entre builders PDF
  - Motiu: degradació controlada de rendering. Capturen errors molt variats de parse/render i canviar-los requereix redissenyar el pipeline PDF, no només estrènyer tipus.

## Conclusió
- La major part dels `except Exception` restants són intencionals i actuen com a límits de seguretat del runtime.
- El següent pas amb retorn real ja no és reduir catches a cegues.
- Si es torna a tocar aquesta zona, hauria de ser com a refactor de disseny:
  - scheduler/job orchestration
  - pipeline PDF/ReportLab
  - wrappers HTTP comuns
