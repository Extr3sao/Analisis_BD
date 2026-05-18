# Quiet Backend Smoke Logs

## Goal
Quitar el ruido del backend real/Oracle de la consola de los smoke Playwright sin perder diagnostico, enviando esos logs al fichero de debug.

## Tasks
- [ ] Extender `smokeRuntime.mjs` con handlers opcionales de stdout/stderr -> Verify: los procesos pueden redirigir salida sin romper el comportamiento actual.
- [ ] Aplicar esos handlers al backend de `smoke:ui:real` y `smoke:ui:oracle` -> Verify: los logs backend van a su debug log y no a consola.
- [ ] Revalidar `smoke:ui:real` y `run_project_regression.py` -> Verify: siguen pasando y la salida queda mas limpia.

## Done When
- [ ] El runner estable sigue en verde y ya no muestra el volcado de peticiones Uvicorn del smoke real en consola.
