# Fix context de distribucio i ruta PROVES

## Goal
Separar correctament els destinataris TIC de les rutes especials al panell de Jobs i afegir una ruta `PROVES` amb el correu de proves.

## Tasks
- [ ] Revisar el model real de dades de `delivery-routes` i `lot-routes` → Verify: tenir causa reproduïda amb dades API.
- [ ] Ajustar `AutomationJobsPanel.jsx` per mostrar `Àrea TIC`, `Contextos especials` i `Lots amb ruta` per separat → Verify: la ruta `TIC/ATIC` i `PROVES` queden visibles.
- [ ] Afegir una ruta especial `PROVES` al backend actual sense trencar la resta de rutes → Verify: `GET /api/automation/delivery-routes` retorna `PROVES`.
- [ ] Cobrir el comportament amb tests → Verify: tests frontend/backend passen.
- [ ] Reconstruir i validar la sortida compilada → Verify: build i comprovació API correctes.

## Done When
- [ ] El panell de Jobs no amaga `ATIC`.
- [ ] Existeix una ruta `PROVES` amb el correu de proves.
- [ ] Els tests i la build passen.
