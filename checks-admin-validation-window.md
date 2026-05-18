# Checks admin validation window

## Goal
Fer visible i editable la finestra temporal de prevalidació al modal de `Gestió de controls`, amb un valor per defecte de les últimes 24 hores.

## Tasks
- [x] Estendre el backend de `validate-preview` per acceptar una finestra temporal explícita. -> Verify: test que comprovi els valors enviats a `_run_single_post_crq_check`.
- [x] Afegir a la UI camps `datetime-local` per a inici i fi, i un resum visible abans de validar. -> Verify: el modal mostra la finestra activa i permet editar-la.
- [x] Afegir ajuda subtil a `Paràmetres` sobre `START_AT/END_AT` i el valor per defecte. -> Verify: el text d'ajuda apareix al formulari.
- [x] Verificar frontend i backend amb tests dirigits. -> Verify: `pytest` i `vitest` verds.

## Done When
- [x] L'usuari veu quina finestra temporal s'usarà abans de validar.
- [x] La prevalidació usa per defecte les últimes 24 hores.
- [x] L'usuari pot modificar fàcilment la data i l'hora d'inici i fi.
