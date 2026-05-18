# Selector Entorn Workbench

## Goal
Afegir un camp per escollir l'entorn d'execució al workbench SQL i assegurar que aquest valor s'envia als endpoints d'execució i comparació.

## Tasks
- [x] Revisar `SQLCodexWorkbench` i `ChecksAdminView` per confirmar props, estat i wiring del perfil → Verify: el component rep `profiles` i exposa un selector visible
- [x] Ajustar l'estat del selector perquè no es reinicialitzi en cada render → Verify: el canvi d'opció persisteix abans d'executar/compare
- [x] Cobrir el comportament amb tests de frontend → Verify: els tests comproven el valor per defecte i l'enviament del perfil seleccionat
- [x] Executar verificació del frontend afectat → Verify: tests del workbench, tests de la vista i build en verd

## Done When
- [x] L'usuari pot escollir l'entorn a executar i aquest valor arriba correctament al backend
