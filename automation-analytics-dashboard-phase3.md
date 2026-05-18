# Dashboard analític d'Automatitzacions

## Goal
Afegir un dashboard analític mensual per lots, esquemes i checks, i permetre exportar-lo a PDF des de la mateixa pestanya d'Automatitzacions.

## Tasks
- [x] Crear el builder PDF mensual a backend -> Verify: l'endpoint retorna un PDF descarregable.
- [x] Afegir endpoints i client API per overview, lots, esquemes i checks -> Verify: el frontend pot carregar les dades del mes.
- [x] Afegir una pantalla `Dashboard` a `AutomationView.jsx` -> Verify: es veu el resum mensual i les tres taules analítiques.
- [x] Afegir proves de backend per overview i PDF -> Verify: `tests.test_automation` cobreix el nou endpoint.
- [x] Verificació final -> Verify: `python -m unittest tests.test_automation`, `npm.cmd run build` i inspecció bàsica del PDF.

## Done When
- [x] Hi ha un dashboard mensual usable a `Automatitzacions`.
- [x] Es pot descarregar un PDF mensual del resum analític.
