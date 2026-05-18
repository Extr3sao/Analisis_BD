# Browser Accessibility Smoke

## Goal
Validar accesibilidad básica de shell y ayuda contextual con teclado, y corregir el skip-link para que mueva foco real al contenido principal.

## Tasks
- [x] Hacer que el skip-link enfoque `main` al activarse -> Verify: `main-content` recibe foco tras activar el enlace.
- [x] Añadir verificación browser de teclado para skip-link y modal de ayuda -> Verify: el smoke comprueba `Tab`, `Enter` y `Escape`.
- [x] Añadir cobertura unitaria mínima del cierre por `Escape` -> Verify: el test del componente pasa.
- [x] Ejecutar verificación completa -> Verify: `lint`, `vitest` y todos los smokes pasan.

## Done When
- [x] El proyecto valida accesibilidad básica de navegación y ayuda en navegador real.

