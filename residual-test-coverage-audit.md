# Residual Test Coverage Audit

## Goal
Identificar huecos de cobertura residuales con riesgo real despues de cerrar la mayor parte de vistas activas.

## Findings
1. Alta: faltan tests directos para hooks globales del shell.
   - `src/web-app/src/hooks/useGlobalReport.js`
   - `src/web-app/src/hooks/usePersistedNavigationState.js`
   - `src/web-app/src/hooks/useProfiles.js`
   Riesgo: gobiernan arranque, persistencia de navegacion/perfil y generacion global de informes. Hoy estan cubiertos solo de forma indirecta por `App`, vistas y browser smoke.

2. Media: faltan tests aislados del shell superior.
   - `src/web-app/src/components/AppShellChrome.jsx`
   - `src/web-app/src/components/AppPageHeader.jsx`
   Riesgo: el comportamiento de `skip-link`, selector de perfil, nav principal y visibilidad de controles globales depende de cobertura indirecta. Un cambio pequeño en estos componentes puede romper accesibilidad o wiring sin fallar en todos los smokes.

3. Media: faltan tests directos de los hooks principales de dominio.
   - `src/web-app/src/hooks/usePostCrqAudit.js`
   - `src/web-app/src/hooks/useDeepScan.js`
   - `src/web-app/src/hooks/useAutomationViewModel.js` y hooks derivados
   Riesgo: la mayor parte de la logica ya pasa por tests de vista y smoke, pero no hay aserciones unitarias sobre normalizacion de payloads, estados intermedios y errores del hook sin UI alrededor.

4. Baja: componentes de contenido/infraestructura sin test aislado.
   - `src/web-app/src/components/AutomationGuide.jsx`
   - `src/web-app/src/components/MermaidBlock.jsx`
   - `src/web-app/src/components/ScoringGuide.jsx`
   Riesgo: bajo para regresion funcional critica. Hoy tienen valor principalmente visual o documental.

5. Baja: `AutomationView.jsx` no tiene test dedicado con ese nombre.
   - `src/web-app/src/views/AutomationView.jsx`
   Cobertura real: ya esta cubierta funcionalmente por `AutomationAndMailConfig.test.jsx` y por los browser smoke de `Automatitzacions`. No es un hueco urgente.

## Recommended Order
1. `useGlobalReport` + `usePersistedNavigationState` + `useProfiles`
2. `AppShellChrome` + `AppPageHeader`
3. `usePostCrqAudit` + `useDeepScan`
4. hooks de automatizaciones por dominio solo si quieres endurecer aun mas la red de seguridad
5. componentes visuales/documentales solo si buscas cobertura casi exhaustiva

## Done When
- [x] Hay un inventario priorizado de huecos residuales.
- [x] El siguiente tramo de testing queda ordenado por riesgo real.
