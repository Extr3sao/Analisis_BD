# Fase 1 Tooling

## Goal
Estabilitzar lint i harness de proves perquè els errors reflecteixin el codi real i no el soroll de configuració.

## Tasks
- [x] Reproduir `eslint`, `vitest` i `pytest` per separar soroll de configuració vs errors reals → Verify: comandes executades i resultats documentats.
- [ ] Ajustar `eslint` per a fitxers React, test i setup → Verify: desapareixen els errors falsos de `vi`, `test`, `expect`, `global`.
- [ ] Afegir mocks globals compartits a Vitest (`IntersectionObserver`, `scrollTo`) → Verify: la suite deixa de fallar per APIs del navegador no implementades.
- [ ] Aïllar `pytest` dels plugins globals del sistema → Verify: `python -m pytest -q` arrenca dins del projecte.
- [ ] Reexecutar verificació de Fase 1 → Verify: `npm run lint`, `npx vitest run`, `python -m pytest -q`.

## Done When
- [ ] Els errors de lint/test que quedin siguin majoritàriament de codi productiu o tests obsolets, no de configuració.
