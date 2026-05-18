# Improve checks admin validation feedback

## Goal
Fer visible l'estat de prevalidació a `Gestió de controls`, millorar la llegibilitat del bloc i mostrar el rang temporal real utilitzat en l'execució.

## Tasks
- [x] Reproduir el problema a la UI i aïllar quins estats de `validating` i `validationResult` es renderitzen. -> Verify: identificada l'absència d'un missatge de progrés i del rang temporal.
- [x] Ajustar el bloc de prevalidació i `ValidationPreview` per mostrar activitat, rang temporal i colors amb millor contrast. -> Verify: la vista renderitza estat de progrés i el resum temporal.
- [x] Afegir tests de frontend per al loading i per a la visualització del rang utilitzat. -> Verify: `vitest` verd al fitxer de la vista.

## Done When
- [x] En validar, la UI indica clarament que la consulta s'està executant.
- [x] El bloc de prevalidació i els missatges tenen contrast suficient.
- [x] La previsualització mostra quines dates/hores s'han utilitzat.
