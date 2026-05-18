# Redisseny context de distribucio

## Goal
Posar el context de distribució sota el formulari del job i mostrar tots els correus de manera llegible.

## Tasks
- [ ] Inspeccionar la UI actual i confirmar els problemes visuals → Verify: reproducció vista real.
- [ ] Redissenyar `AutomationJobsPanel.jsx` perquè el context quedi sota el job → Verify: el context queda a sota del formulari.
- [ ] Mostrar tots els correus a `Àrea TIC`, `Contextos especials` i `Lots amb ruta` → Verify: no hi ha truncament funcional.
- [ ] Ajustar tests del layout → Verify: `vitest` passa.
- [ ] Reconstruir i validar visualment → Verify: `npm run build` i comprovació navegador.

## Done When
- [ ] El context de distribució està sota `Job d'automatització`.
- [ ] `Lots amb ruta` mostra el detall complet dels correus.
- [ ] La verificació visual i els tests passen.
