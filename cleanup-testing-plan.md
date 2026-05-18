# Cleanup i Testing Escalonat

## Goal
Reduir risc tècnic del projecte per fases, començant per sanejament no funcional i acabant en refactors estructurals, amb verificació explícita a cada pas.

## Tasks
- [ ] Fase 1: Fix de tooling i entorn de test (`eslint`, `vitest`, `pytest`) → Verify: `npm run lint`, `npx vitest run`, `python -m pytest -q` arranquen amb configuració estable.
- [ ] Fase 2: Neteja segura de codi mort i imports/estats no usats → Verify: baixa clara d'errors `no-unused-vars` i cap canvi visual/funcional en smoke tests.
- [ ] Fase 3: Alineació de tests amb la UI actual i mocks compartits → Verify: els tests del frontend passen sense dependre de textos o pestanyes antigues.
- [ ] Fase 4: Tancar errors reals d'execució a `App.jsx` i post-CRQ preview → Verify: desapareixen `no-undef`, les rutes actives compilen i el build funciona.
- [ ] Fase 5: Refactor moderat del contenidor principal (`App.jsx`) i extracció de mòduls → Verify: components més petits, mateix comportament, build + tests verds.
- [ ] Fase 6: Enduriment de regressió amb proves E2E/fluxos crítics → Verify: navegació, auditoria, automatitzacions i correu tenen smoke/E2E estables.

## Done When
- [ ] El frontend té lint útil en verd o amb un volum residual controlat i justificat.
- [ ] La suite de test cobreix els fluxos actuals i no la UI històrica.
- [ ] El punt d'entrada principal deixa de concentrar estat trencat o codi inaccessible.
- [ ] Hi ha un camí de verificació repetible abans de qualsevol neteja agressiva.

## Notes
- Ordre recomanat: tooling -> codi mort -> tests -> refactor -> E2E.
- No fer refactor estructural abans d'arreglar la infraestructura de verificació.
