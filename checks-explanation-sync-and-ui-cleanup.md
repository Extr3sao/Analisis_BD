# Checks Explanation Sync And UI Cleanup

## Goal
Eliminar `Paràmetres` del editor de checks y hacer que `Desar i Regenerar IA` actualice también `EXPLICACION_CHECKS_CONTROL_QUALITAT_CRQ.md` con la estructura operativa del catálogo.

## Tasks
- [x] Quitar `Paràmetres` del modal de `Gestió de controls` manteniendo el valor por defecto en backend. Verify: el formulario sigue creando y editando checks sin ese campo visible.
- [x] Generar una sección Markdown completa para el catálogo funcional al regenerar IA. Verify: el texto contiene `## CHECK_NN — Títol` y los apartados `###`.
- [x] Sincronizar esa sección en `EXPLICACION_CHECKS_CONTROL_QUALITAT_CRQ.md` y limpiar caché del catálogo. Verify: el fichero se actualiza y el catálogo recargado refleja el cambio.
- [x] Ajustar tests de frontend y backend. Verify: `pytest` y `vitest` pasan en las áreas tocadas.

## Done When
- [x] El editor queda más simple y `Desar i Regenerar IA` deja alineados SQL, índice TXT y explicación funcional del check.
