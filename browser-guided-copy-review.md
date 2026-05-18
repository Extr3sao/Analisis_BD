# Browser Guided Copy Review

## Goal
Revisar en navegador real el copy visible de `Configuració del servidor` y `Guia i Ajuda`, corregir solo texto roto con evidencia directa y revalidar el frontend.

## Tasks
- [x] Confirmar entorno Playwright y estrategia de revisión -> Verify: `npx` disponible; para `/api` mockeada es más fiable usar el harness Playwright del repo que CLI puro.
- [x] Inspeccionar `MailConfigView` y `TutorialView` en navegador real -> Verify: no apareció evidencia suficiente para editar esos archivos en este corte.
- [x] Corregir solo textos con evidencia directa -> Verify: el corte útil se ha movido a endurecer el harness sobre descargas reales, que aporta más valor técnico ahora.
- [x] Ejecutar verificación -> Verify: `npm run lint`, `npx vitest run --reporter=dot`, `npm run smoke:ui`.

## Done When
- [x] El frontend mantiene validación verde tras endurecer smoke sobre descargas.
