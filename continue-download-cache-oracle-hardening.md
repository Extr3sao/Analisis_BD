# Continue download caching and Oracle smoke hardening

## Goal
Aplicar caché de sessió a descàrregues costoses addicionals i fer el smoke Oracle més robust davant arrencades transitòries.

## Tasks
- [ ] Afegir caché a `useGlobalReport` i `useAutomationAnalytics` -> Verify: els hooks reutilitzen el blob sense repetir request idèntica
- [ ] Cobrir la regressió amb tests dels hooks -> Verify: `vitest` focalitzat passa
- [ ] Endurir `playwright-smoke-oracle.mjs` amb reintents d'arrencada i diagnòstic -> Verify: el harness tolera errors transitoris d'inici
- [ ] Actualitzar documentació si canvia l'operativa -> Verify: `README` reflecteix el comportament nou
- [ ] Verificar el conjunt -> Verify: `npm run lint`, `vitest` focalitzat, `npm run smoke:ui:oracle`

## Done When
- [ ] Les descàrregues repetides no recalculen innecesàriament en la mateixa sessió
- [ ] El smoke Oracle es recupera d'una arrencada fallida transitòria sense intervenció manual
