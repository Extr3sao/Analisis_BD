# Fix Post-CRQ Doc Encoding

## Goal
Evitar que los documentos operativos Post-CRQ expongan o conserven un BOM UTF-8 al servirlos y guardarlos desde la API.

## Tasks
- [ ] Normalizar la lectura de Markdown operativo para eliminar BOM UTF-8 si existe. Verify: la API devuelve el contenido empezando por `#` y no por `\ufeff#`.
- [ ] Normalizar el guardado para no reintroducir BOM al persistir cambios. Verify: el archivo escrito en disco empieza por `#`.
- [ ] Añadir tests de regresión en `tests/test_post_crq_operational_docs.py`. Verify: cubren lectura con BOM y guardado posterior.
- [ ] Ejecutar pruebas y una llamada real al endpoint. Verify: tests en verde y `GET /api/docs/post-crq-operational` sin BOM en el contenido.

## Done When
- [ ] La API sirve ambos Markdown en UTF-8 limpio sin BOM al inicio del contenido.
