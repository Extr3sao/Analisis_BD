# Fix check01 validation and controls warning

## Goal
Corregir l'error de prevalidació de `CHECK_01` i assegurar que el requisit de validació abans de desar es mostri clarament a `Gestió de controls`.

## Tasks
- [x] Reproduir el `ORA-00904` amb el SQL actual de `CHECK_01` i confirmar quin SQL embolcallat genera el backend. -> Verify: reproduït `post_crq_result."START_DATE"` amb el `CHECK_01` modificat.
- [x] Aïllar i corregir l'extracció d'àlies visibles perquè ignori àlies interns del `WITH` i només faci pushdown sobre columnes reals de la `SELECT` externa. -> Verify: test unitari específic verd amb el `CHECK_01` actual.
- [x] Revisar l'estat `canSave` i la renderització del missatge d'avís a `ChecksAdminView`. -> Verify: test de frontend cobreix l'avís visible a la pantalla principal.
- [x] Executar la verificació rellevant backend + frontend. -> Verify: tests dirigits en verd i resum del resultat.

## Done When
- [x] `CHECK_01` ja no genera `ORA-00904` per `START_DATE/END_DATE` en prevalidació.
- [x] L'avís de validació obligatòria es veu quan el formulari no està validat per a la versió actual.
