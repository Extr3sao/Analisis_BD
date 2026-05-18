# Non-Automation Copy Cleanup

## Goal
Corregir copy visible con evidencia real de mojibake fuera del grueso de Automatitzacions, sin tocar lógica ni ampliar el alcance más de lo necesario.

## Tasks
- [x] Corregir textos defectuosos visibles en `PostCrqAuditView.jsx` y `useAutomationAnalytics.js` -> Verify: se corrigió el mensaje `dashboard anal\u00edtic` y los bullets visibles del resumen final.
- [x] Revalidar que `MailConfigView.jsx` y `TutorialView.jsx` no requieren saneamiento adicional ahora -> Verify: revisión puntual sin editar para evitar ruido por codepage; no hay evidencia suficiente para tocar esos archivos en este corte.
- [x] Ejecutar verificación relevante -> Verify: `npm run lint`, `npx vitest run --reporter=dot`, `npm run smoke:ui`.

## Notes
- Se mantienen los fallbacks `Cr?tic` y `Mitj?` en `PostCrqAuditView.jsx` por compatibilidad con payloads legacy degradados; no son copy visible.
- Se mantiene la normalización de secuencias mojibake (`â€¢`, `â€•`, `Â·`) porque repara respuestas del backend o markdown legacy en runtime.

## Done When
- [x] Los textos visibles defectuosos de este corte quedan corregidos.
- [x] La validación frontend sigue en verde.
