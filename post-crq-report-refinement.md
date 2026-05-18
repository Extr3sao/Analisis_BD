# Post-CRQ Report Refinement

## Goal
Refinar el report post-CRQ perquè el contingut dels checks sigui més precís, homogeni i alineat amb la SQL real, regenerar el PDF i deixar un resum de canvis i validacions manuals.

## Tasks
- [x] Revisar la font del report i la SQL real per identificar discrepàncies i punts febles, sobretot a `CHECK_02`, `CHECK_06`, `CHECK_11` i `CHECK_12` -> Verify: llista clara d'ajustos necessaris per check.
- [x] Actualitzar el catàleg narratiu del report amb canvis mínims però d'alt impacte, mantenint l'estructura actual -> Verify: `EXPLICACION_CHECKS_CONTROL_QUALITAT_CRQ.md` reflecteix millor la lògica SQL i elimina redundàncies.
- [x] Crear l'agent reutilitzable de revisió independent de reports amb el prompt QA facilitat -> Verify: existeix l'agent `.agent/agents/post-crq-report-qa-reviewer.md`.
- [x] Regenerar el PDF refinat i el seu TXT de suport a partir de la font actualitzada -> Verify: es generen nous artefactes a `output/pdf/`.
- [x] Verificar el contingut regenerat i la coherència visual/funcional del PDF -> Verify: comprovació textual sense defectes evidents en els checks prioritaris ni en l'annex.
- [x] Generar `millores_refinament_report.md` amb fitxers modificats, checks millorats, tipus de millora i punts pendents de validació manual -> Verify: resum complet i usable al root del projecte.

## Done When
- [x] El PDF regenerat és més precís tècnicament, homogeni i sense afirmacions no suportades per la SQL.
- [x] `CHECK_02`, `CHECK_06`, `CHECK_11` i `CHECK_12` queden clarament millorats.
- [x] Les validacions posteriors deixen de ser genèriques i aporten comprovacions reals.
- [x] Existeix `millores_refinament_report.md` i un agent reutilitzable per a la revisió QA del report.
