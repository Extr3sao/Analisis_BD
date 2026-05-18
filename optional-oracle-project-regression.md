# Optional Oracle Project Regression

## Goal
Hacer que la regresion estable del proyecto ejecute `smoke:ui:oracle` automaticamente cuando el entorno tenga las variables Oracle requeridas, y lo omita de forma explicita cuando no las tenga.

## Tasks
- [ ] Detectar variables Oracle requeridas en `scripts/run_project_regression.py` y decidir run/skip -> Verify: el runner imprime decision clara.
- [ ] Ejecutar `npm run smoke:ui:oracle` solo cuando el entorno sea apto -> Verify: se reutiliza el runner sin romper entornos normales.
- [ ] Actualizar `README.md` con el nuevo comportamiento -> Verify: la seccion de regresion estable ya refleja run/skip automatico.
- [ ] Revalidar `run_project_regression.py` sin variables Oracle -> Verify: pasa y deja `skip` explicito.

## Done When
- [ ] El runner estable sigue pasando sin variables Oracle y deja trazado el skip.
