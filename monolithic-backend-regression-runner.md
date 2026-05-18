# Monolithic Backend Regression Runner

## Goal
Afegir un runner backend monolitic opcional amb timeout alt, sense tocar el runner estable per blocs.

## Tasks
- [ ] Revisar el runner backend actual i definir el contracte del runner monolitic -> Verify: timeout, basetemp i comportament queden clars.
- [ ] Implementar `scripts/run_backend_regression_full.py` i documentar-lo -> Verify: el nou script existeix i el README reflecteix el seu us.
- [ ] Executar el nou runner sobre la suite backend completa -> Verify: el backend complet passa en mode monolitic.

## Done When
- [ ] El repo te un runner backend monolitic opcional i validat.
