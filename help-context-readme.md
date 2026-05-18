# Ajuda contextual i README

## Goal
Afegir un botó d'ajuda `(i)` a totes les pàgines actives del frontend i crear un `README.md` amb l'arquitectura i el funcionament global del sistema.

## Tasks
- [x] Localitzar el layout principal i l'inventari de vistes actives → Verify: `App.jsx` i `src/web-app/src/views/*` identificats.
- [x] Definir el punt d'integració de l'ajuda contextual → Verify: decisió de fer servir un component reutilitzable amb catàleg centralitzat.
- [ ] Crear el component i el mapa de continguts d'ajuda per pàgina → Verify: existeixen fitxers nous reutilitzables al frontend.
- [ ] Injectar el botó `(i)` a les capçaleres i zones sense header compartit → Verify: totes les subpàgines visibles tenen ajuda accessible.
- [ ] Escriure `README.md` amb arquitectura, mòduls, fluxos i connexions → Verify: el document descriu frontend, API, dades i execució.
- [ ] Executar verificació del frontend → Verify: `npm test` o verificació equivalent sense errors en l'àrea tocada.

## Done When
- [ ] L'usuari veu un botó d'ajuda a cada pàgina principal/subpàgina del portal.
- [ ] El contingut explica què fa cada pàgina amb prou context operatiu.
- [ ] El `README.md` nou documenta l'arquitectura i la connexió entre mòduls.
