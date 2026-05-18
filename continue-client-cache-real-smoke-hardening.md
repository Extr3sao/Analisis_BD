# Continue client-download cache and real smoke hardening

## Goal
Afegir caché de sessió a exportacions CSV repetitives i fer el smoke real tolerant a fallades transitòries d'arrencada.

## Tasks
- [ ] Afegir caché a `useAutomationHistoryRetries` i `SnapshotsView` -> Verify: una segona exportació idèntica no repeteix request
- [ ] Cobrir la regressió amb tests focalitzats -> Verify: `vitest` focalitzat passa
- [ ] Replicar reintents d'arrencada a `playwright-smoke-real.mjs` -> Verify: backend i Vite es reinicien automàticament si cauen abans d'estar llestos
- [ ] Actualitzar README si cal -> Verify: documentació alineada
- [ ] Verificar el conjunt -> Verify: `npm run lint`, `vitest` focalitzat, `npm run smoke:ui:real`

## Done When
- [ ] Les exportacions CSV repetides reutilitzen el blob dins de la mateixa sessió
- [ ] El smoke real no requereix rellançament manual davant una fallada transitòria d'inici
