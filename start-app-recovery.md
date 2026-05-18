# Recover App Start

## Goal
Recuperar el arranque local de la aplicacion y corregir el script para Windows.

## Tasks
- [x] Confirmar la reproduccion del fallo en `run-clean.ps1` -> Verify: error de `Start-Process` al lanzar `npm`.
- [x] Cambiar el arranque del frontend para usar `cmd.exe /c npm.cmd` -> Verify: `run-clean.ps1 -WithFrontend -NoBuild` ya no falla en el paso de Vite.
- [x] Relanzar backend y frontend -> Verify: API en `http://127.0.0.1:8011/api/profiles` y UI en `http://localhost:5175/`.

## Done When
- [x] La aplicacion queda levantada con backend y frontend accesibles.
