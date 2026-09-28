# Migración desde Analisis_BD

Repositorio original: `https://github.com/Extr3sao/Analisis_BD`

Fecha: 2026-09-27

- Commit base anterior: `5fc1536a4465bb2013fdce3720abfa9a6bc6e946`
- Commit de migración: `b26a587da7cb1d5ccb6ea83a4a7a81525c55ac63`
- Rama de respaldo: `backup/pre-e13db-migration`
- Rama de migración: `migration/e13db`

El repositorio fue reutilizado para alojar E13DB.

El contenido de la aplicación Analisis_BD anterior fue sustituido por el proyecto E13DB.

El historial Git anterior se conserva para trazabilidad. No es necesario conservar el código previo en el árbol principal: sigue disponible en el historial Git y en la rama `backup/pre-e13db-migration`.

La migración se prepara en `migration/e13db`; `main` no se modifica hasta que la Pull Request sea revisada y aprobada.

## Rollback

No se reescribe historial. Para recuperar el árbol previo, revise o cree una nueva rama desde `backup/pre-e13db-migration`; esta rama apunta exactamente al commit anterior de `main`. La Pull Request de migración permanece en borrador y no debe fusionarse hasta completar la certificación.
