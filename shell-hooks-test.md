# Shell Hooks Test

## Goal
Cubrir los hooks globales del shell: perfiles, navegacion persistida y generacion global de informes.

## Tasks
- [x] Inspeccionar entorno de test y dependencias -> Verify: confirmar mocks viables para axios, localStorage, alert y descargas.
- [x] Crear test de `usePersistedNavigationState` -> Verify: normaliza valores legacy y persiste cambios.
- [x] Crear test de `useProfiles` -> Verify: carga perfiles, aplica default y maneja error.
- [x] Crear test de `useGlobalReport` -> Verify: bloquea sin auditoria, genera payload correcto y maneja error blob.
- [x] Ejecutar verificacion focalizada -> Verify: `npx vitest run src/hooks/usePersistedNavigationState.test.jsx src/hooks/useProfiles.test.jsx src/hooks/useGlobalReport.test.jsx --reporter=dot`.
- [x] Ejecutar verificacion general -> Verify: `npm run lint`, `npx vitest run --reporter=dot`.

## Done When
- [x] Los hooks globales del shell quedan cubiertos.
- [x] La validacion frontend sigue en verde.
