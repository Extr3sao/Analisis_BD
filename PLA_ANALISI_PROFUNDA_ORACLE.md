# Pla d'Analisi Profunda Oracle (Esquemes, Dependencies i Activitat)

## Objectiu
Executar una investigacio profunda, reproduible i auditable dels esquemes Oracle per decidir, amb evidencia, quins esquemes s'han de conservar, revisar o proposar per retirada.

## Enfoc d'Agents i Skills

| Fase | Agent principal | Skills clau | Resultat esperat |
|---|---|---|---|
| Governanca i pla | `orchestrator` + `project-planner` | `plan-writing`, `brainstorming`, `clean-code` | Backlog, sequencia i criteris d'acceptacio |
| Analisi Oracle | `oracle-dba-auditor` + `database-architect` | `database-design`, `clean-code` | Dataset d'evidencies per esquema |
| Risc i seguretat | `security-auditor` | `vulnerability-scanner`, `red-team-tactics` | Risc de grants/privilegis i bloquejadors |
| Validacio funcional | `test-engineer` | `testing-patterns`, `tdd-workflow`, `lint-and-validate` | Proves API/motor i regressions cobertes |
| Informe final | `documentation-writer` | `documentation-templates` | Informe auditable + recomanacio final |

## Parametres comuns d'execucio SQL
- `:schema_like` -> patro LIKE (exemple `%MGR_APP%`)
- `:ddl_days` = 180
- `:stats_days` = 30
- `:mods_days` = 30
- `:login_recent_days` = 90
- `:jobs_recent_days` = 90
- `:size_min_gb` = 1
- `:size_high_gb` = 10

## Fase 0. Preparacio i baseline
- [ ] Definir univers d'esquemes objectiu (whitelist) i exclusions (`SYS`, `SYSTEM`, comptes protegits).
  - Verify: llista validada i versionada al pla.
- [ ] Fixar finestres temporals i llindars de mida.
  - Verify: parametres aprovats i congelats.
- [ ] Confirmar mode connexio Oracle (thin/thick) i credencials.
  - Verify: connexio estable i perfil usat registrat.

## Fase 1. Extraccio d'evidencies (consultes de `DOCUMENTACIO_AUDITORIA.md` corregides)

### Q01 - Resum 360 d'activitat, dependencies, mida i us real
```sql
WITH params AS (
  SELECT
    :ddl_days AS ddl_days,
    :stats_days AS stats_days,
    :mods_days AS mods_days,
    :login_recent_days AS login_recent_days,
    :jobs_recent_days AS jobs_recent_days,
    :size_min_gb AS size_min_gb,
    :size_high_gb AS size_high_gb
  FROM dual
),
seg AS (
  SELECT owner, ROUND(SUM(bytes)/1024/1024/1024,2) AS size_gb
  FROM dba_segments
  GROUP BY owner
),
o AS (
  SELECT owner, COUNT(*) AS object_count
  FROM dba_objects
  GROUP BY owner
),
a AS (
  SELECT username,
         NVL(ROUND(SYSDATE - CAST(last_login AS DATE),0), 999) AS last_login_days_ago
  FROM dba_users
),
ddl AS (
  SELECT owner,
         TRUNC(SYSDATE - MAX(last_ddl_time)) AS days_since_newest_ddl,
         SUM(CASE WHEN last_ddl_time >= SYSDATE - (SELECT ddl_days FROM params) THEN 1 ELSE 0 END) AS ddl_recent_cnt
  FROM dba_objects
  GROUP BY owner
),
stats AS (
  SELECT owner, COUNT(*) AS tables_stats_recent
  FROM dba_tables
  WHERE last_analyzed >= SYSDATE - (SELECT stats_days FROM params)
  GROUP BY owner
),
mods AS (
  SELECT table_owner AS owner, COUNT(*) AS tables_with_mods
  FROM dba_tab_modifications
  WHERE NVL("TIMESTAMP", DATE '1900-01-01') >= SYSDATE - (SELECT mods_days FROM params)
  GROUP BY table_owner
),
j AS (
  SELECT owner,
         SUM(CASE WHEN enabled = 'TRUE' AND NVL(state,'') <> 'DISABLED' THEN 1 ELSE 0 END) AS active_jobs,
         SUM(CASE WHEN last_start_date >= SYSDATE - (SELECT jobs_recent_days FROM params) THEN 1 ELSE 0 END) AS jobs_started_recent
  FROM dba_scheduler_jobs
  GROUP BY owner
),
ap AS (
  SELECT owner, COUNT(*) AS apex_applications
  FROM apex_applications
  GROUP BY owner
),
d_out AS (
  SELECT owner, COUNT(*) AS external_dependencies_out
  FROM dba_dependencies
  WHERE owner <> referenced_owner
  GROUP BY owner
),
d_in AS (
  SELECT referenced_owner AS owner, COUNT(*) AS inbound_references
  FROM dba_dependencies
  WHERE owner <> referenced_owner
  GROUP BY referenced_owner
),
trg AS (
  SELECT owner, COUNT(*) AS enabled_triggers
  FROM dba_triggers
  WHERE status = 'ENABLED'
  GROUP BY owner
),
resumen AS (
  SELECT
    u.username,
    u.account_status,
    ROUND(SYSDATE - u.created, 0) AS days_old,
    NVL(seg.size_gb, 0) AS size_gb,
    NVL(o.object_count, 0) AS object_count,
    NVL(a.last_login_days_ago, 999) AS last_login_days,
    NVL(j.active_jobs, 0) AS active_jobs,
    NVL(ap.apex_applications, 0) AS apex_applications,
    NVL(d_out.external_dependencies_out, 0) AS external_dependencies_out,
    NVL(d_in.inbound_references, 0) AS inbound_references,
    NVL(ddl.days_since_newest_ddl, 999) AS days_since_newest_ddl,
    NVL(stats.tables_stats_recent, 0) AS tables_stats_recent_30d,
    NVL(mods.tables_with_mods, 0) AS tables_with_mods_30d,
    NVL(j.jobs_started_recent, 0) AS jobs_started_recent,
    NVL(trg.enabled_triggers, 0) AS enabled_triggers
  FROM dba_users u
  LEFT JOIN seg   ON seg.owner = u.username
  LEFT JOIN o     ON o.owner = u.username
  LEFT JOIN a     ON a.username = u.username
  LEFT JOIN ddl   ON ddl.owner = u.username
  LEFT JOIN stats ON stats.owner = u.username
  LEFT JOIN mods  ON mods.owner = u.username
  LEFT JOIN j     ON j.owner = u.username
  LEFT JOIN ap    ON ap.owner = u.username
  LEFT JOIN d_out ON d_out.owner = u.username
  LEFT JOIN d_in  ON d_in.owner = u.username
  LEFT JOIN trg   ON trg.owner = u.username
  WHERE u.username LIKE :schema_like
)
SELECT
  r.*,
  CASE WHEN (r.tables_with_mods_30d > 0 OR r.tables_stats_recent_30d > 0 OR r.last_login_days < (SELECT login_recent_days FROM params)) THEN 1 ELSE 0 END AS alarm_1_activity_recent,
  CASE WHEN (r.active_jobs > 0 OR r.jobs_started_recent > 0) THEN 1 ELSE 0 END AS alarm_2_jobs,
  CASE WHEN r.apex_applications > 0 THEN 1 ELSE 0 END AS alarm_3_apex,
  CASE WHEN r.external_dependencies_out > 0 THEN 1 ELSE 0 END AS alarm_4_external_deps,
  CASE WHEN r.inbound_references > 0 THEN 1 ELSE 0 END AS alarm_5_inbound_refs,
  CASE WHEN r.enabled_triggers > 0 THEN 1 ELSE 0 END AS alarm_6_triggers,
  CASE
    WHEN (r.tables_with_mods_30d > 0 OR r.tables_stats_recent_30d > 0 OR r.active_jobs > 0 OR r.jobs_started_recent > 0 OR r.apex_applications > 0 OR r.external_dependencies_out > 0 OR r.inbound_references > 0 OR r.enabled_triggers > 0) THEN 'NO ELIMINAR'
    WHEN r.days_since_newest_ddl <= :ddl_days THEN 'PRECAUCIO'
    ELSE 'ELIMINAR'
  END AS resultat
FROM resumen r
ORDER BY resultat, last_login_days NULLS LAST, size_gb DESC;
```

### Q02 - Mida total per esquema
```sql
SELECT
  owner AS esquema,
  ROUND(SUM(bytes)/1024/1024/1024,2) AS size_gb,
  COUNT(*) AS segment_count
FROM dba_segments
WHERE owner LIKE :schema_like
GROUP BY owner
ORDER BY size_gb DESC;
```

### Q03 - Dades de compte, seguretat i acces
```sql
SELECT
  username,
  created,
  last_login,
  account_status,
  lock_date,
  expiry_date,
  default_tablespace,
  temporary_tablespace,
  profile
FROM dba_users
WHERE username LIKE :schema_like;
```

### Q04 - Activitat de canvis (DDL/stats/mods)
```sql
WITH owners AS (
  SELECT username AS owner
  FROM dba_users
  WHERE username LIKE :schema_like
),
ddl AS (
  SELECT owner, COUNT(*) AS ddl_recent
  FROM dba_objects
  WHERE owner IN (SELECT owner FROM owners)
    AND last_ddl_time >= SYSDATE - :ddl_days
  GROUP BY owner
),
stats AS (
  SELECT owner, COUNT(*) AS tables_stats_recent
  FROM dba_tables
  WHERE owner IN (SELECT owner FROM owners)
    AND last_analyzed >= SYSDATE - :stats_days
  GROUP BY owner
),
mods AS (
  SELECT table_owner AS owner, COUNT(*) AS tables_with_mods
  FROM dba_tab_modifications
  WHERE table_owner IN (SELECT owner FROM owners)
    AND NVL("TIMESTAMP", DATE '1900-01-01') >= SYSDATE - :mods_days
  GROUP BY table_owner
)
SELECT
  o.owner,
  NVL(d.ddl_recent, 0) AS ddl_recent,
  NVL(s.tables_stats_recent, 0) AS tables_stats_recent,
  NVL(m.tables_with_mods, 0) AS tables_with_mods,
  CASE
    WHEN NVL(m.tables_with_mods, 0) > 0 THEN 'NO ELIMINAR'
    WHEN NVL(m.tables_with_mods, 0) = 0 AND NVL(d.ddl_recent, 0) > 0 THEN 'PRECAUCIO'
    ELSE 'ELIMINAR'
  END AS resultat
FROM owners o
LEFT JOIN ddl d   ON d.owner = o.owner
LEFT JOIN stats s ON s.owner = o.owner
LEFT JOIN mods m  ON m.owner = o.owner
ORDER BY o.owner;
```

### Q05 - Objectes per tipus i dates extremes
```sql
SELECT
  owner,
  object_type,
  COUNT(*) AS quantity,
  MIN(created) AS oldest_created,
  MAX(created) AS newest_created,
  MIN(last_ddl_time) AS oldest_ddl,
  MAX(last_ddl_time) AS newest_ddl
FROM dba_objects
WHERE owner LIKE :schema_like
GROUP BY owner, object_type
ORDER BY owner, newest_ddl DESC;
```

### Q06 - Objectes modificats els darrers 180 dies
```sql
SELECT
  owner,
  object_name,
  object_type,
  created,
  last_ddl_time,
  status
FROM dba_objects
WHERE owner LIKE :schema_like
  AND last_ddl_time >= SYSDATE - :ddl_days
ORDER BY last_ddl_time DESC;
```

### Q07 - Volum de dades i vigencia d'estadistiques
```sql
SELECT
  owner,
  table_name,
  num_rows,
  last_analyzed,
  sample_size,
  ROUND(SYSDATE - last_analyzed,0) AS days_since_analyzed
FROM dba_tables
WHERE owner LIKE :schema_like
  AND last_analyzed IS NOT NULL
ORDER BY last_analyzed DESC;
```

### Q08 - Dependencies entrants (bloquejador fort)
```sql
SELECT
  owner AS dependent_owner,
  name AS dependent_name,
  type AS dependent_type,
  referenced_owner,
  referenced_name,
  referenced_type,
  dependency_type
FROM dba_dependencies
WHERE referenced_owner LIKE :schema_like
  AND owner NOT LIKE :schema_like
ORDER BY dependent_owner, referenced_owner;
```

### Q09 - Dependencies sortints
```sql
SELECT
  owner,
  name,
  type,
  referenced_owner,
  referenced_name,
  referenced_type,
  dependency_type
FROM dba_dependencies
WHERE owner LIKE :schema_like
  AND referenced_owner NOT LIKE :schema_like
ORDER BY referenced_owner, owner;
```

### Q10 - Sinonims del/sobre l'esquema
```sql
SELECT
  owner,
  synonym_name,
  table_owner,
  table_name,
  db_link
FROM dba_synonyms
WHERE owner LIKE :schema_like
   OR table_owner LIKE :schema_like
ORDER BY owner, table_owner, table_name;
```

### Q11 - Privilegis atorgats per l'esquema
```sql
SELECT
  grantor,
  privilege,
  grantee,
  owner,
  table_name,
  grantable,
  hierarchy
FROM dba_tab_privs
WHERE grantor LIKE :schema_like
ORDER BY grantee, grantor;
```

### Q12 - Privilegis rebuts sobre objectes externs
```sql
SELECT
  grantor,
  privilege,
  grantee,
  owner,
  table_name,
  grantable,
  hierarchy
FROM dba_tab_privs
WHERE grantee LIKE :schema_like
  AND grantor NOT LIKE :schema_like
ORDER BY grantor, privilege;
```

### Q13 - Privilegis de sistema globals
```sql
SELECT
  grantee,
  privilege,
  admin_option,
  common,
  inherited
FROM dba_sys_privs
WHERE grantee LIKE :schema_like
ORDER BY privilege;
```

## Fase 2. Consultes addicionals recomanades (no al document, pero critiques)

### Q14 - Referencies en codi (dba_source + dba_views + triggers)
```sql
SELECT owner, name, type
FROM dba_source
WHERE UPPER(text) LIKE UPPER('%' || REPLACE(:schema_like, '%', '') || '.%')
  AND owner NOT IN ('SYS','SYSTEM')
FETCH FIRST 200 ROWS ONLY;
```
```sql
SELECT owner, view_name AS name, 'VIEW' AS type
FROM dba_views
WHERE UPPER(text_vc) LIKE UPPER('%' || REPLACE(:schema_like, '%', '') || '.%')
  AND owner NOT IN ('SYS','SYSTEM')
FETCH FIRST 200 ROWS ONLY;
```
```sql
SELECT owner, trigger_name AS name, 'TRIGGER' AS type
FROM dba_triggers
WHERE UPPER(NVL(when_clause,' ')) LIKE UPPER('%' || REPLACE(:schema_like, '%', '') || '.%')
  AND owner NOT IN ('SYS','SYSTEM')
FETCH FIRST 200 ROWS ONLY;
```

### Q15 - Jobs actius i recents
```sql
SELECT
  owner,
  job_name,
  enabled,
  state,
  last_start_date,
  next_run_date
FROM dba_scheduler_jobs
WHERE owner LIKE :schema_like
ORDER BY owner, job_name;
```

### Q16 - Triggers habilitats
```sql
SELECT
  owner,
  trigger_name,
  table_owner,
  table_name,
  status,
  triggering_event
FROM dba_triggers
WHERE owner LIKE :schema_like
  AND status = 'ENABLED'
ORDER BY owner, trigger_name;
```

### Q17 - Aplicacions APEX vinculades
```sql
SELECT
  workspace,
  application_id,
  application_name,
  owner,
  last_updated_on
FROM apex_applications
WHERE owner LIKE :schema_like
ORDER BY owner, application_id;
```

### Q18 - DB links amb impacte en runtime
```sql
SELECT
  owner,
  db_link,
  username,
  host,
  created
FROM dba_db_links
WHERE owner LIKE :schema_like
   OR owner = 'PUBLIC'
ORDER BY owner, db_link;
```

### Q19 - Objectes invalids (senyal de risc operatiu)
```sql
SELECT
  owner,
  object_name,
  object_type,
  status,
  last_ddl_time
FROM dba_objects
WHERE owner LIKE :schema_like
  AND status <> 'VALID'
ORDER BY owner, object_type, object_name;
```

## Fase 3. Scoring i decisio
- [ ] Aplicar scoring de `src/api/audit_engine.py` i contrastar-lo amb Q01/Q04.
  - Verify: `obsolescence_score` coherent amb alarmes i bloquejadors.
- [ ] Regles de desempat obligatories.
  - Verify: si hi ha dependencies entrants, jobs, triggers o APEX, classificar com `NO ELIMINAR`.
- [ ] Etiquetar cada esquema: `NO ELIMINAR` / `PRECAUCIO` / `ELIMINAR`.
  - Verify: cada etiqueta amb minim 2 evidencies.

## Fase 4. Validacio amb tests existents
- [ ] `python scripts/test_engine.py`
  - Verify: estructura de resposta estable en errors de connexio.
- [ ] `python scripts/verify_dashboard_api.py`
  - Verify: claus esperades al dashboard stats.
- [ ] `python scripts/verify_rectification.py`
  - Verify: deep-scan robust (single, complex i bulk input).
- [ ] `python -m unittest tests/test_ai_integration.py`
  - Verify: resposta i analisi IA operatives (amb API key configurada).

## Fase 5. Enduriment de qualitat
- [ ] Afegir tests unitaris de scoring (casos limit dependencies/APEX/jobs/grants).
- [ ] Afegir test d'integracio SQL->API per validar mappings de camps.
- [ ] Executar `python .agent/scripts/checklist.py .`.

## Deliverables
- [ ] Informe d'auditoria per esquema amb evidencies.
- [ ] Resultats en CSV/JSON per dashboard.
- [ ] Llista de candidats a eliminacio + condicions previes.
- [ ] Acta de riscos amb bloquejadors i justificacio tecnica.

## Criteris de tancament
- [ ] 100% esquemes objectiu analitzats.
- [ ] 0 esquemes `ELIMINAR` amb dependencies entrants actives.
- [ ] Tests clau de `scripts/` i `tests/` executats i documentats.
- [ ] Aprovacio final per criteri conservador de risc.
