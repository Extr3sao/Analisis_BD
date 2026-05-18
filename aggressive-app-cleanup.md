# Aggressive App Cleanup

## Goal
Eliminar ramas legacy inalcanzables de `src/web-app/src/App.jsx` manteniendo la UI activa cubierta por pruebas funcionales de regresión.

## Tasks
- [ ] Mapear código legacy aún vivo en `App.jsx` y acotar qué estado, imports y handlers pertenecen a `Panell`, `Anàlisi` y `Configuració` → Verify: lista clara de símbolos y ramas a retirar sin tocar subtabs activas.
- [ ] Reforzar o ajustar la batería funcional existente para la navegación y ayuda contextual que dependen de `App.jsx` → Verify: tests de `App.smoke.test.jsx` y `AppHelp.test.jsx` representan la UI actual.
- [ ] Eliminar ramas JSX inalcanzables y su estado asociado en `App.jsx` → Verify: `eslint src/App.jsx` sin errores.
- [ ] Limpiar imports/componentes auxiliares huérfanos tras el recorte agresivo → Verify: `eslint src/App.jsx` y sin símbolos muertos.
- [ ] Ejecutar regresión funcional frontend completa → Verify: `npm run lint` y `npx vitest run --reporter=dot` en verde.

## Done When
- [ ] `App.jsx` ya no contiene ramas para tabs superiores inalcanzables ni estado de configuración legacy no usado.
- [ ] La UI activa sigue pasando la batería funcional y de ayuda contextual.
