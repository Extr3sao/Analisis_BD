# AutomationView Copy Cleanup

## Goal
Eliminar el mojibake visible en `AutomationView.jsx` sin cambiar la lógica del módulo.

## Tasks
- [ ] Crear una normalización mecánica segura para el fichero -> Verificar: bajan o desaparecen los patrones `Ã`, `Â`, `â`.
- [ ] Revisar y corregir restos puntuales en bloques activos (dashboard, jobs, templates, history, retries) -> Verificar: los textos visibles quedan legibles.
- [ ] Revalidar lint, Vitest y smoke de navegador -> Verificar: `npm run lint`, `npx vitest run --reporter=dot`, `npm run smoke:ui`.

## Done When
- [ ] `AutomationView.jsx` no muestra copy dañado en las pantallas activas y la red de seguridad sigue en verde.
