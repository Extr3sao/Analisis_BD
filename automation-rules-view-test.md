# Automation Rules View Test

## Goal
Cubrir `AutomationRulesView` con tests aislados para carga, filtrado y guardado del flujo principal.

## Tasks
- [x] Inspeccionar la vista y dependencias -> Verify: identificar endpoints, acciones y estados visibles.
- [x] Crear test dedicado de render y operaciones clave -> Verify: cubre filtros, seleccion de regla y guardado/alta.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/views/AutomationRulesView.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `AutomationRulesView` queda cubierta para su flujo principal.
- [x] La validacion frontend sigue en verde.
