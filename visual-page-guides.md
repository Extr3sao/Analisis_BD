# Visual Page Guides

## Goal
Implementar un sistema reutilizable de ayuda visual contextual para las vistas principales del frontend React, con contenido real por pantalla, diagrama funcional, integración con `helpKey` y documentación de ampliación.

## Tasks
- [ ] Mapear vistas, hooks y servicios activos para extraer propósito, entradas, procesos, salidas y relaciones por pantalla -> Verify: lista cerrada de `helpKey` y pantallas cubiertas.
- [ ] Diseñar un modelo de configuración y un renderer común para la guía visual sin introducir una segunda arquitectura paralela -> Verify: la ayuda se resuelve desde una única fuente basada en `helpKey`.
- [ ] Implementar componentes reutilizables, diagrama funcional responsive y estilos compartidos integrados con la UI actual -> Verify: el botón de ayuda abre un panel rico con resumen, acciones, arquitectura, flujo, datos y mapa visual.
- [ ] Conectar las guías a las vistas y subpantallas principales ya navegables desde la aplicación -> Verify: cabecera global y cabeceras internas muestran ayuda contextual coherente.
- [ ] Documentar cómo añadir nuevas guías y ejecutar verificación frontend relevante -> Verify: `npm run lint` y `npx vitest run --reporter=dot`.

## Done When
- [ ] Las pantallas principales del programa tienen guía contextual visual reutilizable y ampliable.
- [ ] El contenido está adaptado al código real de cada vista, no es genérico.
- [ ] La solución queda documentada y verificada.
