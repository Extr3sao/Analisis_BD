# Checks Admin Encoding And Contrast Fix

## Goal
Corregir los textos con mala codificación y mejorar el contraste visual de la pantalla de gestión de controles.

## Tasks
- [x] Localizar la vista afectada y aislar los textos mojibake y estilos de bajo contraste. Verify: `ChecksAdminView.jsx` concentra los síntomas.
- [ ] Normalizar los textos visibles de la vista y eliminar etiquetas/badges con caracteres corruptos. Verify: el archivo ya no contiene cadenas mojibake visibles.
- [ ] Ajustar colores, fondos y estados para el tema claro actual del dashboard. Verify: inputs, banners, tabla y panel lateral mantienen contraste legible.
- [ ] Ejecutar la verificación del frontend. Verify: `vitest` de la vista y `npm run build` pasan.

## Done When
- [ ] La pantalla muestra textos correctos en catalán/español y los elementos interactivos se leen bien sobre el fondo claro.
