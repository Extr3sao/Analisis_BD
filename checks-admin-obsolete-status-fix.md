# Fix obsolete IA status after save

## Goal
Evitar que `Gestió de controls` mostri `OBSOLETA` just després de desar una nova versió i regenerar la IA.

## Tasks
- [x] Aïllar com es resol `estat_explicacio` al llistat i al detall del check. -> Verify: confirmat que usava l'última fila global d'`explicacions` i no la versió vigent.
- [x] Corregir la resolució perquè consulti la versió vigent i marqui `PENDENT` si la nova versió encara no té explicació. -> Verify: llistat i detall retornen l'estat correcte.
- [x] Afegir test de regressió pel cas "nova versió sense explicació, versió anterior obsoleta". -> Verify: `pytest` verd.

## Done When
- [x] Després de desar una nova versió, l'estat IA no queda falsament com `OBSOLETA`.
