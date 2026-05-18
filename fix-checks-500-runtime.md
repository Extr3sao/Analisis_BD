# Fix Checks 500 Runtime

## Goal
Reproducir el fallo real en `Gestió de controls`, distinguir entre backend caído y error 500 de endpoint, y dejar el flujo operativo.

## Tasks
- [x] Levantar la API en `8011` y confirmar que `/api/checks` vuelve a responder. Verify: `GET /api/checks` devuelve `200`.
- [x] Reproducir la acción problemática de carga o guardado contra la API viva. Verify: identificar endpoint exacto y error exacto.
- [x] Aplicar el fix mínimo si sigue habiendo `500` y volver a validar frontend/backend. Verify: tests relevantes y endpoint real correctos.

## Done When
- [x] `Gestió de controls` carga y edita checks sin error de red ni `500`.
