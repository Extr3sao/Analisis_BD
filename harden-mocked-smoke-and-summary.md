# Harden mocked smoke and write consolidated summary

## Goal
Fer que el smoke mockejat es recuperi d'arrencades transitòries i deixar un resum consolidat de l'estat tècnic actual.

## Tasks
- [ ] Afegir reintents de Vite a `playwright-smoke.mjs` -> Verify: el harness reinicia el servidor si cau abans d'estar llest
- [ ] Actualitzar README amb l'operativa nova -> Verify: documentació alineada
- [ ] Escriure un resum consolidat a la arrel -> Verify: existeix un document curt amb arquitectura, smoke i cobertura
- [ ] Verificar el conjunt -> Verify: `npm run lint` i `npm run smoke:ui`

## Done When
- [ ] El smoke mockejat no requereix rellançament manual davant fallades transitòries d'inici
- [ ] El resum consolidat reflecteix l'estat real del frontend, smoke real i smoke Oracle
