# Eliminar la part de Tasques i Regles

## Goal
Eliminar la pestanya i funcionalitat de "Tasques i regles" del Dashboard d'Auditoria per simplificar la interfície segons la petició de l'usuari.

## Tasks
- [x] **Configuració de Pestanyes**: Eliminar 'Tasques i regles' de `DATABASE_AUDIT_SUBTABS` i les llistes de visibilitat a `src/web-app/src/config/databaseAuditTabs.js`. → Verify: `grep` no troba la cadena.
- [x] **Neteja de Workspace**: Eliminar la importació de `AutomationRulesView` i la seva renderització condicional a `src/web-app/src/views/DatabaseAuditWorkspace.jsx`. → Verify: El fitxer compila sense errors.
- [x] **Eliminació de Fitxer**: Esborrar el fitxer de la vista `src/web-app/src/views/AutomationRulesView.jsx`. → Verify: El fitxer ja no existeix al disc.
- [ ] **Verificació**: Regenerar el build del frontend i comprovar que la pestanya ja no apareix. → Verify: Captura de pantalla del dashboard.

## Done When
- [ ] La pestanya "Tasques i regles" ja no és visible al menú superior.
- [ ] El codi font no conté referències actives a la vista eliminada.
- [ ] L'aplicació arrenca sense errors de compilació o runtime al frontend.
