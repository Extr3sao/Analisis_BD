# Post CRQ PDF Helper Hardening

## Goal
Reduir captures genèriques en helpers PDF de `post_crq_audit.py` sense tocar el comportament de fallback.

## Tasks
- [x] Estrènyer `safe_pdf_markup_paragraph(...)` a errors de parse/markup esperats -> Verify: retorna `Paragraph` amb fallback
- [x] Estrènyer el fallback de `getPlainText()` al guard de ReportLab -> Verify: sintaxi i tests verdes
- [x] Afegir regressió focalitzada -> Verify: `pytest tests/test_post_crq_audit.py`

## Done When
- [x] Els helpers crítics ja no depenen de `except Exception`
- [x] El fallback segueix sent operatiu
