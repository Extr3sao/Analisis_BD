# Domain Hooks Test

## Goal
Cubrir los hooks de dominio con más riesgo residual: `usePostCrqAudit` y `useDeepScan`.

## Tasks
- [x] Inspeccionar hooks y dependencias -> Verify: identificar carga inicial, ramas de error y acciones publicas.
- [x] Crear test de `usePostCrqAudit` -> Verify: carga checks, inicializa defaults, ejecuta run y exporta consultas.
- [x] Crear test de `useDeepScan` -> Verify: ejecuta test de conexion, lanza auditoria y resetea estado derivado.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/hooks/usePostCrqAudit.test.jsx src/hooks/useDeepScan.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] `usePostCrqAudit` y `useDeepScan` quedan cubiertos para los flujos de mayor riesgo.
- [x] La validacion frontend sigue en verde.
