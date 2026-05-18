# Automation Analytics Load Error Smoke

## Goal
Endurecer `smoke:ui:load-error` para cubrir un fallo de carga del dashboard analítico en `Automatitzacions` sin depender de carreras entre cargas iniciales.

## Tasks
- [x] Mockear fallo específico del dashboard analítico en `load-error` -> Verify: `/api/automation/analytics/overview` devuelve `Fallo controlado dashboard analytics`.
- [x] Forzar navegación a `Dashboard` y refresco explícito en el smoke -> Verify: el banner cambia a `Fallo controlado dashboard analytics`.
- [x] Ejecutar verificación -> Verify: `npm run smoke:ui:load-error`, `npm run lint`, `npx vitest run --reporter=dot`.

## Debugging Note
- Reproducción: `smoke:ui:load-error` falló por selector ambiguo en `Refresca`.
- Aislamiento: existen dos botones visibles con el mismo nombre accesible, uno en sidebar y otro en el panel dashboard.
- Root cause: selector no acotado en el harness.
- Fix aplicado: usar el segundo botón visible del dashboard tras navegar explícitamente a esa pantalla.

## Done When
- [x] `smoke:ui:load-error` cubre también el dashboard analítico.
- [x] La validación frontend sigue en verde.
