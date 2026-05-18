# AutomationView Panel Extraction

## Goal
Seguir reduciendo `AutomationView.jsx` extrayendo los paneles de Dashboard y Ajuda sin tocar estado ni llamadas API.

## Tasks
- [ ] Crear componente para el panel de Dashboard -> Verificar: mantiene métricas, tablas y acciones de exportación/refresco.
- [ ] Crear componente para el panel de Ajuda -> Verificar: mantiene el contenido actual con `AutomationGuideContent`.
- [ ] Sustituir ambos bloques en `AutomationView.jsx` por delegación a componentes -> Verificar: el archivo reduce tamaño y compila.
- [ ] Revalidar lint, Vitest y smoke real -> Verificar: `npm run lint`, `npx vitest run --reporter=dot`, `npm run smoke:ui`.

## Done When
- [ ] `AutomationView.jsx` pierde dos bloques grandes de render y la cobertura sigue en verde.
