# Retenció i Neteja d'Automatitzacions

## Goal
Afegir neteja manual d'històric antic i buidat de la cua de reintents, amb valor per defecte de 30 dies i verificació des de backend i UI.

## Tasks
- [ ] Afegir resum i purga d'històric a `src/core/automation_store.py` -> Verify: el mètode retorna comptadors i esborra runs antics amb els seus detalls.
- [ ] Afegir purga de cua de reintents a `src/core/automation_store.py` -> Verify: el mètode elimina elements de `delivery_retry_queue` i retorna el recompte.
- [ ] Exposar endpoints de manteniment a `src/api/main.py` -> Verify: hi ha rutes per veure resum i executar la purga.
- [ ] Afegir client API i accions UI a `src/web-app/src/views/AutomationView.jsx` -> Verify: es pot llançar "mantén últims 30 dies" i "buida cua" des d'Automatitzacions.
- [ ] Afegir proves a `tests/test_automation.py` -> Verify: els tests cobreixen purga d'històric i cua.
- [ ] Verificació final -> Verify: `python -m unittest tests.test_automation` i `npm.cmd run build` passen.

## Done When
- [ ] Es pot netejar l'històric antic mantenint només l'últim mes.
- [ ] Es pot buidar la cua de reintents des de la interfície.
