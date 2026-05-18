# Millores de refinament del report post-CRQ

## Fitxers modificats
- `EXPLICACION_CHECKS_CONTROL_QUALITAT_CRQ.md`
- `src/api/post_crq_audit.py`
- `tests/test_post_crq_report_refinement.py`
- `.agent/agents/post-crq-report-qa-reviewer.md`
- `post-crq-report-refinement.md`

## Artefactes regenerats
- `output/pdf/report_auditoria_post_crq_general_E13DBA_refinat_v5.pdf`
- `output/pdf/report_auditoria_post_crq_general_E13DBA_refinat_v5.txt`

## Checks millorats

### CHECK_02
- Impacte refinat per fer-lo dependent de volum, recurrència d'accés i ús real.
- Limitació funcional explicitada: la SQL només acredita absència total d'índexs, no necessitat efectiva d'indexació.
- Validació posterior ampliada amb contrast de plans d'execució i cost sobre DML.

### CHECK_06
- Acció requerida corregida per evitar eliminacions directes.
- Revisió orientada a definició completa, ordre de columnes, constraints i plans d'execució.
- Validació posterior reforçada amb comprovació funcional i de rendiment.

### CHECK_11
- Descripció alineada amb la SQL real: detecció heurística de proximitat `LOOP/FOR` + DML.
- Cobertura no implementada explicitada: no detecta `COMMIT`, `DBMS_OUTPUT` ni `EXECUTE IMMEDIATE`.
- S'ha afegit exigència de validació manual quan hi ha dubte o quan es vol extrapolar cobertura.

### CHECK_12
- Criteri refinat per no penalitzar qualsevol loop sense context.
- Acció i impacte condicionats a volum, freqüència, finestra operativa i cost de refactorització.
- Validació posterior ampliada amb contrast funcional, transaccional i de rendiment.

## Millores documentals transversals
- Eliminada la barreja redundant de seccions de l'annex: `Com revisar` i `Validació posterior` ja no repliquen blocs d'altres apartats.
- Homogeneïtzada la redacció institucional dels apartats d'impacte, acció i validació.
- Reduïdes generalitzacions no demostrables per la SQL real dels controls.

## Verificació aplicada
- Compilació Python:
  - `python -m py_compile src\\api\\post_crq_audit.py src\\core\\check_explanation_catalog.py tests\\test_post_crq_report_refinement.py`
- Tests:
  - `.venv\\Scripts\\python.exe -m pytest tests\\test_post_crq_report_refinement.py -q`
- Verificació del PDF regenerat:
  - extracció a TXT i contrast dels apartats d'annex de `CHECK_02`, `CHECK_06`, `CHECK_11` i `CHECK_12`
  - comprovació que ja no apareixen les redundàncies `Columnes recomanades per interpretar el resultat` ni `Limitacions i matisos del control`

## Punts que requereixen validació manual
- `CHECK_02`: confirmar patrons d'accés, joins i benefici real de la indexació abans de crear índexs.
- `CHECK_06`: validar si els índexs són realment redundants amb plans d'execució i suport a constraints.
- `CHECK_11`: revisar manualment si el DML és realment dins del bucle i si la troballa és un fals positiu per proximitat.
- `CHECK_12`: confirmar si el volum, la freqüència i el cost de refactorització justifiquen de debò una optimització bulk.

## Incidència operativa detectada durant la verificació
- El primer PDF regenerat via HTTP encara mostrava contingut antic perquè el backend en execució mantenia en memòria una versió prèvia del catàleg i del builder.
- S'ha resolt reiniciant el procés `uvicorn` i regenerant els artefactes finals sobre l'aplicació actualitzada.
