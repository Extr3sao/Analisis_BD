# Frontend Build Optimization

## Goal
Reducir el riesgo operativo del build frontend eliminando el warning de chunks grandes sin romper los harnesses ni la app en producción.

## Tasks
- [ ] Reproducir el warning actual de build y localizar los módulos pesados -> Verify: `npm run build` muestra el warning y quedan identificados los chunks relevantes.
- [ ] Introducir split de chunks en Vite para aislar dependencias grandes y rutas pesadas -> Verify: `vite.config.js` genera chunks separados con nombres estables.
- [ ] Revalidar frontend funcional y smokes estables -> Verify: `npm run lint`, `npx vitest run --reporter=dot`, `npm run build`, `npm run smoke:ui`, `npm run smoke:ui:real` pasan.
- [ ] Revalidar la regresión estable de proyecto -> Verify: `python scripts/run_project_regression.py` pasa.

## Done When
- [ ] El build deja de emitir el warning de chunks grandes y la regresión estable sigue en verde.
