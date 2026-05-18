# Check AI Preview Integration

## Goal
Integrar un prompt ampliado para la previsualización IA al editar checks y mostrar en la UI un bloque explicativo completo, sin romper el formato documental ya usado por las sincronizaciones.

## Tasks
- [ ] Revisar el contrato actual entre `checks_admin_router.py`, `dba_query_explainer.py` y `ChecksAdminView.jsx` -> Verify: quedan identificados los campos reutilizables y los que conviene añadir solo para preview.
- [ ] Ajustar el prompt maestro de `DBAQueryExplainer` para producir texto más interpretativo y útil para revisión técnica real -> Verify: el prompt sigue devolviendo el JSON esperado.
- [ ] Añadir un bloque de preview textual con la estructura fija pedida para el modal de edición -> Verify: `/api/checks/validate-preview` devuelve el texto completo listo para mostrar.
- [ ] Actualizar la UI de `ChecksAdminView` para renderizar la explicación ampliada en la previsualización IA -> Verify: el modal muestra el bloque largo además del resumen actual.
- [ ] Ajustar tests de backend y frontend y ejecutar la validación relevante -> Verify: pasan los tests tocados.

## Done When
- [ ] Al validar un check desde el editor, la previsualización IA muestra un informe amplio con los apartados fijos pedidos y el flujo existente sigue funcionando.
