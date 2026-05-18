# OpenRouter Quota Aware Fallback

## Goal
Hacer que el `DBAExplainer` distinga entre cuota diaria global agotada de modelos gratuitos y errores puntuales de un modelo, para que el fallback sea correcto y el mensaje al usuario sea útil.

## Tasks
- [ ] Añadir parseo de errores OpenRouter con detalle de mensaje y metadatos. Verify: se puede distinguir `free-models-per-day` de otros `429/404`.
- [ ] Parar el fallback cuando la cuota global gratuita esté agotada y seguir buscando solo en errores puntuales de modelo. Verify: `explain()` devuelve un error explícito de cuota global.
- [ ] Añadir tests unitarios del comportamiento. Verify: `pytest` pasa para el explainer.

## Done When
- [ ] El sistema no malgasta intentos recorriendo modelos cuando la cuota global ya está agotada y el error final explica la causa real.
