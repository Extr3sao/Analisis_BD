# Prevalidacio Checks

## Goal
Afegir una prevalidació obligatòria a Gestió de controls que executi la consulta a Oracle, mostri resultat i preview IA, i només permeti desar si la validació ha estat correcta.

## Tasks
- [ ] Afegir endpoint `preview/validate` per a checks a backend reutilitzant l'execució real Post-CRQ → Verify: retorna estat, files, SQL executat i preview IA o error Oracle.
- [ ] Passar el perfil Oracle seleccionat fins a `ChecksAdminView` → Verify: la vista rep `selectedProfile` des de `DatabaseAuditWorkspace`.
- [ ] Afegir al modal botó de validar, panell de resultats i bloc d'explicació IA prèvia → Verify: la UI mostra execució, error o preview abans de permetre desar.
- [ ] Bloquejar `Crear/Desar i Regenerar IA` si la SQL actual no està validada amb èxit → Verify: no envia `POST/PUT` després de canviar SQL sense tornar a validar.
- [ ] Cobrir backend i frontend amb tests de regressió → Verify: suites de tests del router i de la vista passen.

## Done When
- [ ] Un canvi de SQL a Gestió de controls obliga a validar abans de guardar i els errors Oracle es veuen abans de persistir la versió.
