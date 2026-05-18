# regression-stabilization

## Goal
Asegurar el estado actual del proyecto reproduciendo el fallo pendiente, corrigiendo la causa mínima y revalidando la regresión principal.

## Tasks
- [ ] Reproducir la regresión actual con el runner estable y localizar el primer fallo real -> Verify: comando falla con causa concreta
- [ ] Corregir la causa mínima en código o tests -> Verify: el caso reproducido deja de fallar
- [ ] Revalidar proyecto con los checks más relevantes -> Verify: runner estable o bloque equivalente en verde

## Done When
- [ ] La regresión principal del proyecto vuelve a pasar o queda un bloqueo externo demostrado
