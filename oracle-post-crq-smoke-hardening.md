# oracle-post-crq-smoke-hardening

## Goal
Corregir el bloqueo del smoke Oracle en `post-CRQ` y ampliar la validacion real de descargas a una segunda variante.

## Tasks
- [x] Reproducir el fallo del smoke Oracle y aislar si fallaba el click, la peticion `run` o la espera posterior -> Verify: `npm run smoke:ui:oracle` y trazas de Playwright muestran el punto exacto.
- [x] Corregir la base del harness para resolver `ORACLE_SMOKE_CONNECTIONS_FILE` relativo al repo cuando se ejecuta desde `src/web-app` -> Verify: el script encuentra `config\\Cadena_conexions.txt`.
- [x] Corregir el backend Post-CRQ para priorizar `ESQUEMA` frente a `OWNER` al envolver SQL -> Verify: `tests\\test_post_crq_wrapped_sql.py` pasa.
- [x] Ajustar el smoke Oracle a timeouts reales del `run` y de `/api/audit/post-crq/reports` -> Verify: el smoke espera el `POST /run` y las respuestas de informes sin cortar prematuramente.
- [x] Ampliar el smoke Oracle para validar `ZIP` y `Resum general` desde la UI -> Verify: se observan las dos respuestas `POST /api/audit/post-crq/reports` con `Content-Disposition` esperado.
- [x] Documentar la operativa y la duracion esperable del harness Oracle -> Verify: `README.md` refleja el flujo y los tiempos.

## Done When
- [x] El smoke Oracle pasa con perfil Oracle real.
- [x] El flujo Post-CRQ real descarga `ZIP` y `general` desde navegador.
