# Refactor AutomationView Shell

## Goal
Reducir el tamaño de `AutomationView.jsx` separando configuración estática y UI de shell sin cambiar el comportamiento funcional.

## Tasks
- [x] Crear módulo de configuración para pantallas, filtros y etiquetas de automatizaciones -> Verificar: `AutomationView.jsx` deja de declarar esos bloques.
- [x] Extraer modal de ayuda y navegación/encabezado interno a componentes -> Verificar: la pantalla sigue mostrando el mismo contenido y acciones.
- [x] Limpiar imports y definiciones muertas en `AutomationView.jsx` -> Verificar: `npm run lint`.
- [x] Revalidar tests y smoke que cubren automatizaciones -> Verificar: `npx vitest run --reporter=dot` y `npm run smoke:ui`.

## Done When
- [x] `AutomationView.jsx` baja de tamaño y mantiene la cobertura funcional existente en verde.
