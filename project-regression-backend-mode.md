# Project Regression Backend Mode Selector

## Goal
Permetre que la regressio completa del projecte seleccioni el runner backend estable o monolitic via entorn, mantenint el mode estable com a default.

## Tasks
- [ ] Afegir selector `BACKEND_REGRESSION_MODE` a `run_project_regression.py` -> Verify: el runner tria `stable` o `full` i valida valors incorrectes.
- [ ] Documentar el selector al `README.md` -> Verify: el contracte del runner complet queda actualitzat.
- [ ] Revalidar el runner del projecte en mode `stable` i `full` -> Verify: tots dos passen.

## Done When
- [ ] El runner complet permet backend `stable|full` sense canviar el comportament per defecte.
