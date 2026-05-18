# Purga automàtica programada d'automatitzacions

## Goal
Executar una purga automàtica diària del manteniment d'`Automatitzacions` per conservar només l'històric recent i netejar reintents tancats sense tocar els pendents.

## Tasks
- [x] Afegir configuració persistent de purga automàtica a `delivery_config` -> Verify: el store llegeix i desa defaults sense trencar la configuració SMTP actual.
- [x] Afegir una purga selectiva de cua per a reintents tancats antics -> Verify: només s'eliminen estats finals fora de finestra.
- [x] Integrar la purga automàtica al `tick()` del scheduler amb anti-reexecució diària -> Verify: una crida a `tick()` purga una vegada i actualitza la marca temporal.
- [x] Afegir prova de backend del flux programat -> Verify: `tests.test_automation` cobreix la purga automàtica.
- [x] Verificació final -> Verify: `python -m unittest tests.test_automation`.

## Done When
- [x] El scheduler executa la purga automàtica una vegada al dia.
- [x] L'històric antic i els reintents tancats antics es netegen sense esborrar pendents.
