# Projecte Auditoria BBDD

## Què és

Aplicació interna per auditar entorns Oracle des de dos fronts:

- `Anàlisi obsolets`: auditoria profunda d'obsolescència per esquemes, amb scoring, dependències i informe.
- `Auditoria de canvis`: auditoria tècnica post-CRQ basada en checks SQL definits a `auditoria_post_crq.md`.

La solució combina un frontend React/Vite amb una API FastAPI. El frontend viu a `src/web-app` i el backend a `src/api`.

## Arquitectura funcional

### Frontend

- `src/web-app/src/App.jsx`
  - Navegació principal.
  - Selector global de base de dades Oracle.
  - Generació d'informes Markdown/PDF.
- `src/web-app/src/views/PostCrqAuditView.jsx`
  - Vista específica de l'auditoria post-CRQ.
- `src/web-app/src/views/SnapshotsView.jsx`
  - Consulta de snapshots parquet.
- `src/web-app/src/views/ObsoletsRegistryView.jsx`
  - Registre manual d'objectes obsolets.

### Backend

- `src/api/main.py`
  - Endpoints HTTP principals.
  - Generació d'informes.
- `src/api/audit_engine.py`
  - Motor de `Deep Scan` / `Anàlisi obsolets`.
- `src/api/post_crq_audit.py`
  - Parser del markdown post-CRQ.
  - Execució de checks.
  - Resum funcional i informes post-CRQ.
- `src/core/db_manager.py`
  - Connexió i execució SQL Oracle.
- `src/core/config_loader.py`
  - Càrrega de perfils Oracle des de `config/Cadena_conexions.txt`.

## Modes d'auditoria

### 1. Anàlisi obsolets

Reutilitza el `Deep Scan` existent:

- entrada per esquema o llista d'esquemes,
- execució del pla Q01..Q19,
- càlcul de score d'obsolescència,
- detall de dependències, DDL, stats, jobs, triggers i APEX,
- export a Markdown o PDF.

### 2. Auditoria de canvis

Executa checks post-CRQ llegits des de `auditoria_post_crq.md`:

- llegeix metadades de cada check (`CHECK_XX`, severitat, criteri, SQL),
- converteix `&DAYS_BACK` a binds executables,
- permet filtrar per base de dades, esquema i finestra temporal,
- agrupa resultats per check,
- genera informe `resum + detall`.

## Perfils Oracle

Les connexions no es defineixen al frontend. Es gestionen al backend mitjançant:

- `config/Cadena_conexions.txt`
- `config/.env`

El selector de base de dades del frontend consumeix `GET /api/profiles` i activa un perfil com `E13BD`, `E13BDA` o similars.

## API principal

- `GET /api/profiles`
- `GET /api/audit/post-crq/checks`
- `POST /api/audit/post-crq/run`
- `GET /api/audit/deep-scan/{schema}`
- `POST /api/report/generate`
- `POST /api/db/test`

## Informes

`POST /api/report/generate` suporta tres formes de dades:

- auditoria transparent resumida,
- deep scan / anàlisi obsolets,
- auditoria post-CRQ.

Formats disponibles:

- Markdown `.md`
- PDF `.pdf`

## Agents

Agents locals rellevants a `.agent/agents`:

- `oracle-dba-auditor`
- `oracle-audit-query-executor`
- `quality-code-bd`

`quality-code-bd` està orientat a qualitat tècnica Oracle post-CRQ i revisió de canvis recents.

## Execució

### Web unificat

```powershell
.\run.ps1
```

Obrir:

```text
http://127.0.0.1:8000
```

### Frontend en desenvolupament

```powershell
cd src\web-app
npm run dev
```

### Backend en desenvolupament

```powershell
python -m uvicorn src.api.main:app --reload --port 8000
```

## Tests

Backend:

- `tests/test_audit_plan_engine.py`
- `tests/test_post_crq_audit.py`
- `tests/test_report_generation.py`

Frontend:

- `src/web-app/src/App.smoke.test.jsx`

## Fitxers clau de domini

- `auditoria_post_crq.md`
- `DOCUMENTACIO_AUDITORIA.md`
- `README_AUDIT.md`
- `src/analytics/deep_audit_plan_queries.py`

