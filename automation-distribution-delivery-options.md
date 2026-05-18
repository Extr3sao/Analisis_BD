# Opcions de destinacio per emails de distribucio

## Goal
Substituir els toggles de lots/TIC per una configuració real de destinacions i un override de correus per proves.

## Tasks
- [ ] Estendre el model `job_config` amb opcions de lliurament i override de destinataris → Verify: backend normalitza i conserva els camps.
- [ ] Actualitzar el formulari React perquè permeti seleccionar destins i informar correus de prova → Verify: la UI mostra els nous controls.
- [ ] Fer que el backend respecti `lots`, `tic` i l'override de destinataris → Verify: els enviaments s'adrecen on toca.
- [ ] Cobrir backend/frontend amb tests → Verify: `pytest` i `vitest` passen.
- [ ] Reconstruir frontend i validar → Verify: `npm run build` passa.

## Done When
- [ ] Es pot desactivar l'enviament a lots o TIC de debò.
- [ ] Es poden redirigir correus només a una persona per fer proves.
- [ ] Els tests passen.
