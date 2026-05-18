# Check Sync Pending Fix

## Goal
Evitar que una edicion manual de un check quede revertida por la resincronizacion desde markdown y que los fallos de IA dejen el estado en pendiente indefinidamente.

## Tasks
- [ ] Ajustar la resincronizacion desde markdown para no pisar versiones locales pendientes de sincronizar -> Verify: `GET /api/checks` mantiene vigente la ultima version de usuario.
- [ ] Marcar error explicito de sincronizacion cuando falle la regeneracion IA antes de escribir ficheros -> Verify: el estado deja de quedar en `PENDENT` tras un fallo de red.
- [ ] Añadir tests backend para ambos escenarios -> Verify: los tests nuevos fallan sin el cambio y pasan con el cambio.
- [ ] Ejecutar la verificacion relevante -> Verify: la suite objetivo termina en verde.

## Done When
- [ ] Una edicion de `CHECK_01` no se revierte al refrescar mientras la sincronizacion sigue pendiente.
- [ ] Un fallo de OpenRouter deja trazado `ERROR` en vez de `PENDENT`.
