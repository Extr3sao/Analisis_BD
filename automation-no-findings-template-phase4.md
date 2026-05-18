# Plantilla de correu per lots sense troballes

## Goal
Afegir una plantilla específica per als lots avaluats sense troballes i permetre activar-ne l'enviament per job sense canviar el comportament actual per defecte.

## Tasks
- [x] Afegir la plantilla `provider_without_findings` a backend i al catàleg de UI -> Verify: la plantilla surt a la llista i es manté retrocompatible.
- [x] Estendre la configuració del job amb l'opció `send_without_findings` -> Verify: el formulari desa i carrega l'opció.
- [x] Enviar correu als lots `SIN_HALLAZGOS` només si l'opció està activa -> Verify: el run registra l'enviament i no requereix adjunt individual.
- [x] Afegir proves de backend del nou flux -> Verify: `tests.test_automation` cobreix el cas amb i sense troballes.
- [x] Verificació final -> Verify: `python -m unittest tests.test_automation` i `npm.cmd run build`.

## Done When
- [x] Existeix la plantilla editable per a lots sense troballes.
- [x] El job pot enviar-la opcionalment sense trencar la política actual.
