# post_crq audit utc and timestamp cleanup

## Goal
Normalizar puntos temporales clave de post_crq_audit a UTC y extraer helpers de timestamp de bajo riesgo.

## Tasks
- [x] Localizar usos temporales naive que afectaban a contexto, filtros y exportaciones
- [x] Sustituir el runtime temporal central por helpers UTC reutilizables
- [x] Reusar helpers de timestamp para reducir duplicación segura en builders/exportaciones
- [x] Añadir regresión sobre generated_at/resolved_at y revalidar suite dirigida

## Done When
- [x] context.generated_at y time_filter.resolved_at salen normalizados
- [x] Los builders usan helpers comunes de timestamp donde tocaba
