# Auditoria tècnica post-CRQ / desenvolupaments recents

## Descripció

Detecta males pràctiques de disseny i desenvolupament en objectes Oracle modificats recentment, amb focus en canvis de CRQ / desplegaments.

## Abast

- Esquemes no de sistema
- Objectes modificats en els últims `N` dies

## Notes

- Aquest enfocament serveix per auditar canvis **DDL** / desplegaments recents.
- No pretén mesurar activitat **DML** (`INSERT / UPDATE / DELETE`).
- Totes les columnes de sortida estan etiquetades en **català**.

## Paràmetre comú

```sql
DEFINE DAYS_BACK = 7;
```

---

```sql
-- =============================================================================
-- CHECK 01: TAULES RECENTS SENSE PRIMARY KEY
-- Severitat: ALT
-- Criteri:
--   Només taules l'objecte TABLE de les quals s'hagi modificat en els últims N dies
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT
    t.owner                                              AS esquema,
    t.table_name                                         AS taula,
    NVL(TO_CHAR(t.num_rows), 'sense estadistiques')      AS num_rows,
    NVL(TO_CHAR(t.last_analyzed, 'YYYY-MM-DD'), 'mai')   AS darrera_estadistica,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI')       AS data_modificacio_objecte,
    'ALT'                                                AS severitat
FROM all_tables t
JOIN dba_objects o
  ON o.owner = t.owner
 AND o.object_name = t.table_name
 AND o.object_type = 'TABLE'
WHERE t.owner IN (SELECT owner FROM esquemes_actius)
  AND t.temporary = 'N'
  AND t.iot_type IS NULL
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
  AND NOT EXISTS (
      SELECT 1
      FROM all_constraints c
      WHERE c.owner = t.owner
        AND c.table_name = t.table_name
        AND c.constraint_type = 'P'
        AND c.status = 'ENABLED'
  )
ORDER BY t.owner, t.table_name;
```

---

```sql
-- =============================================================================
-- CHECK 02: TAULES RECENTS SENSE ÍNDEXS
-- Severitat: MITJÀ
-- Criteri:
--   Només taules l'objecte TABLE de les quals s'hagi modificat en els últims N dies
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT
    t.owner                                              AS esquema,
    t.table_name                                         AS taula,
    NVL(TO_CHAR(t.num_rows), 'sense estadistiques')      AS num_rows,
    NVL(TO_CHAR(t.last_analyzed, 'YYYY-MM-DD'), 'mai')   AS darrera_estadistica,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI')       AS data_modificacio_objecte,
    'MITJÀ'                                              AS severitat
FROM all_tables t
JOIN dba_objects o
  ON o.owner = t.owner
 AND o.object_name = t.table_name
 AND o.object_type = 'TABLE'
WHERE t.owner IN (SELECT owner FROM esquemes_actius)
  AND t.temporary = 'N'
  AND t.iot_type IS NULL
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
  AND NOT EXISTS (
      SELECT 1
      FROM all_indexes i
      WHERE i.table_owner = t.owner
        AND i.table_name = t.table_name
  )
ORDER BY t.owner, t.table_name;
```

---

```sql
-- =============================================================================
-- CHECK 03: SEQÜÈNCIES SENSE CACHE 
-- Versió sense AWR: usa increment_by com a indicador d'ús
-- Severitat: ALT (NOCACHE) / MITJÀ (cache < 20)
-- Criteri:
--   Seqüències modificades en els últims N dies amb NOCACHE o cache < 20.
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT
    s.sequence_owner                                           AS esquema,
    s.sequence_name                                            AS sequencia,
    s.cache_size                                               AS cache_actual,
    s.increment_by                                             AS increment_by_value,
    CASE WHEN s.cache_size = 0
         THEN 'NOCACHE'
         ELSE 'Cache insuficient (<20)'
    END                                                        AS problema,
    'N/D (AWR no disponible)'                                  AS avg_nextval_dia,
    '-'                                                        AS pic_max_snapshot,
    '-'                                                        AS total_nextval_periode,
    CASE
        WHEN s.cache_size = 0 AND s.increment_by = 1          THEN 50
        WHEN s.cache_size = 0 AND s.increment_by > 1          THEN 100
        ELSE 20
    END                                                        AS cache_recomanada,
    CASE
        WHEN s.cache_size = 0 AND s.increment_by = 1
        THEN 'NOCACHE + increment=1 (OLTP, IDs seqüencials): minim recomanat 50'
        WHEN s.cache_size = 0 AND s.increment_by > 1
        THEN 'NOCACHE + increment>1 (possible batch): recomanat 100'
        ELSE 'Cache < 20: insuficient, minim recomanat 20'
    END                                                        AS justificacio,
    'Heuristica (increment_by)'                                AS font_dades,
    CASE WHEN s.cache_size = 0 THEN 'ALT' ELSE 'MITJÀ' END   AS severitat,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI')            AS data_modificacio_objecte
FROM dba_sequences s
JOIN dba_objects o
  ON o.owner       = s.sequence_owner
 AND o.object_name = s.sequence_name
 AND o.object_type = 'SEQUENCE'
WHERE s.sequence_owner IN (SELECT owner FROM esquemes_actius)
  AND s.cache_size < 20
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
ORDER BY s.sequence_owner,
         CASE WHEN s.cache_size = 0 THEN 0 ELSE 1 END,
         s.sequence_name;
```

---

```sql
-- =============================================================================
-- CHECK 04: FOREIGN KEYS SENSE ÍNDEX DE SUPORT
-- Severitat: ALT
-- Criteri:
--   Sense índex sobre la primera columna de la FK.
--   Oracle necessita un table-level lock al fer DELETE o UPDATE a la taula pare.
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT DISTINCT
    c.owner AS esquema,
    c.table_name AS taula,
    c.constraint_name AS constraint_fk,
    (SELECT LISTAGG(cc2.column_name, ', ') WITHIN GROUP (ORDER BY cc2.position)
       FROM all_cons_columns cc2
      WHERE cc2.owner = c.owner
        AND cc2.constraint_name = c.constraint_name) AS columnes_fk,
    r.owner || '.' || r.table_name AS taula_pare,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI') AS data_modificacio_taula,
    'ALT' AS severitat
FROM all_constraints c
JOIN all_cons_columns cc
  ON c.owner = cc.owner
 AND c.constraint_name = cc.constraint_name
 AND cc.position = 1
JOIN all_constraints r
  ON c.r_owner = r.owner
 AND c.r_constraint_name = r.constraint_name
JOIN dba_objects o
  ON o.owner = c.owner
 AND o.object_name = c.table_name
 AND o.object_type = 'TABLE'
WHERE c.owner IN (SELECT owner FROM esquemes_actius)
  AND c.constraint_type = 'R'
  AND c.status = 'ENABLED'
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
  AND NOT EXISTS (
      SELECT 1
      FROM all_ind_columns ic
      WHERE ic.table_owner = c.owner
        AND ic.table_name = c.table_name
        AND ic.column_name = cc.column_name
        AND ic.column_position = 1
  )
ORDER BY c.owner, c.table_name, c.constraint_name;
```

---

```sql
-- =============================================================================
-- CHECK 05: CONSTRAINTS RECENTS DESHABILITADES
-- Severitat: ALT
-- Criteri:
--   Només constraints sobre taules modificades en els últims N dies
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT
    ac.owner AS esquema,
    ac.table_name AS taula,
    ac.constraint_name AS nom_constraint,
    CASE ac.constraint_type
        WHEN 'P' THEN 'PRIMARY KEY'
        WHEN 'U' THEN 'UNIQUE'
        WHEN 'R' THEN 'FOREIGN KEY'
        WHEN 'C' THEN 'CHECK'
        ELSE ac.constraint_type
    END AS tipus_constraint,
    ac.status AS estat,
    ac.validated AS validada,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI') AS data_modificacio_taula,
    'ALT' AS severitat
FROM all_constraints ac
JOIN dba_objects o
  ON o.owner = ac.owner
 AND o.object_name = ac.table_name
 AND o.object_type = 'TABLE'
WHERE ac.owner IN (SELECT owner FROM esquemes_actius)
  AND ac.status = 'DISABLED'
  AND ac.constraint_type IN ('P', 'U', 'R', 'C')
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
ORDER BY ac.owner, ac.table_name, ac.constraint_type, ac.constraint_name;
```

---

```sql
-- =============================================================================
-- CHECK 06: ÍNDEXS DUPLICATS RECENTS (MATEIXA COLUMNA LÍDER)
-- Severitat: MITJÀ
-- Criteri:
--   Almenys un dels dos índexs s'ha modificat en els últims N dies
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT DISTINCT
    i1.owner AS esquema,
    i1.table_name AS taula,
    i1.index_name AS index_1,
    i2.index_name AS index_2,
    ic1.column_name AS columna_lider_comuna,
    i1.index_type AS tipus_1,
    i2.index_type AS tipus_2,
    TO_CHAR(GREATEST(o1.last_ddl_time, o2.last_ddl_time), 'YYYY-MM-DD HH24:MI') AS data_modificacio_mes_recent,
    'MITJÀ' AS severitat
FROM all_indexes i1
JOIN all_indexes i2
  ON i1.owner = i2.owner
 AND i1.table_name = i2.table_name
 AND i1.index_name < i2.index_name
JOIN all_ind_columns ic1
  ON i1.owner = ic1.index_owner
 AND i1.index_name = ic1.index_name
 AND ic1.column_position = 1
JOIN all_ind_columns ic2
  ON i2.owner = ic2.index_owner
 AND i2.index_name = ic2.index_name
 AND ic2.column_position = 1
JOIN dba_objects o1
  ON o1.owner = i1.owner
 AND o1.object_name = i1.index_name
 AND o1.object_type = 'INDEX'
JOIN dba_objects o2
  ON o2.owner = i2.owner
 AND o2.object_name = i2.index_name
 AND o2.object_type = 'INDEX'
WHERE i1.owner IN (SELECT owner FROM esquemes_actius)
  AND ic1.column_name = ic2.column_name
  AND (o1.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD') AND TO_DATE(:end_date, 'YYYY-MM-DD') + 1
       OR o2.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD') AND TO_DATE(:end_date, 'YYYY-MM-DD') + 1)
ORDER BY i1.owner, i1.table_name, i1.index_name;
```

---

```sql
-- =============================================================================
-- CHECK 07: OBJECTES RECENTS INVÀLIDS
-- Severitat: CRÍTIC
-- Criteri:
--   Només objectes invàlids modificats en els últims N dies
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT
    owner AS esquema,
    object_name AS objecte,
    object_type AS tipus_objecte,
    TO_CHAR(created, 'YYYY-MM-DD') AS data_creacio,
    TO_CHAR(last_ddl_time, 'YYYY-MM-DD HH24:MI:SS') AS data_invalidacio,
    'CRÍTIC' AS severitat
FROM dba_objects
WHERE owner IN (SELECT owner FROM esquemes_actius)
  AND status = 'INVALID'
  AND last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                        AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
ORDER BY owner, object_type, object_name;
```

---

```sql
-- =============================================================================
-- CHECK 08: COLUMNES NUMBER SENSE PRECISIÓ NI ESCALA
-- Severitat: BAIX
-- Criteri:
--   Només columnes de taules modificades en els últims N dies
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT
    tc.owner AS esquema,
    tc.table_name AS taula,
    tc.column_name AS columna,
    tc.nullable AS nullable,
    tc.column_id AS posicio,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI') AS data_modificacio_taula,
    'BAIX' AS severitat
FROM all_tab_columns tc
JOIN dba_objects o
  ON o.owner = tc.owner
 AND o.object_name = tc.table_name
 AND o.object_type = 'TABLE'
WHERE tc.owner IN (SELECT owner FROM esquemes_actius)
  AND tc.data_type = 'NUMBER'
  AND tc.data_precision IS NULL
  AND tc.data_scale IS NULL
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
ORDER BY tc.owner, tc.table_name, tc.column_id;
```

---

```sql
-- =============================================================================
-- CHECK 09: SINÒNIMS RECENTS TRENCATS
-- Severitat: MITJÀ
-- Criteri:
--   Només sinònims modificats en els últims N dies i sense DB_LINK
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT
    s.owner AS esquema,
    s.synonym_name AS sinonim,
    s.table_owner AS propietari_desti,
    s.table_name AS objecte_desti,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI') AS data_modificacio_sinonim,
    'MITJÀ' AS severitat
FROM all_synonyms s
JOIN dba_objects o
  ON o.owner = s.owner
 AND o.object_name = s.synonym_name
 AND o.object_type = 'SYNONYM'
WHERE s.owner IN (SELECT owner FROM esquemes_actius)
  AND s.db_link IS NULL
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
  AND NOT EXISTS (
      SELECT 1
      FROM dba_objects ao
      WHERE ao.owner = s.table_owner
        AND ao.object_name = s.table_name
  )
ORDER BY s.owner, s.synonym_name;
```

---

```sql
-- =============================================================================
-- CHECK 10: WHEN OTHERS THEN NULL EN CODI RECENT
-- Severitat: STOPPER
-- Criteri:
--   Només objectes de codi modificats en els últims N dies
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev
      ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
)
SELECT
    s.owner AS esquema,
    s.name AS objecte,
    s.type AS tipus,
    s.line AS linia,
    SUBSTR(TRIM(s.text), 1, 200) AS codi,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI') AS data_modificacio_objecte,
    'STOPPER' AS severitat
FROM all_source s
JOIN dba_objects o
  ON o.owner = s.owner
 AND o.object_name = s.name
 AND o.object_type = s.type
WHERE s.owner IN (SELECT owner FROM esquemes_actius)
  AND REGEXP_LIKE(s.text, 'WHEN\s+OTHERS\s+THEN\s+NULL', 'i')
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
ORDER BY s.owner, s.name, s.line;
```

---

```sql
-- =============================================================================
-- CHECK 11: PROBLEMES DE CODI EN PAQUETS/PROCEDURES/FUNCIONS
-- Severitat: ALT / BAIX (segons patró)
-- Criteri:
--   Objectes PL/SQL modificats en els últims N dies amb patrons problemàtics:
--   - DBMS_OUTPUT (codi de debug en producció): BAIX
--   - COMMIT en objectes amb LOOP (anti-patró transaccional): ALT
--   - EXECUTE IMMEDIATE amb concatenació de strings (risc SQL injection): ALT
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
),
objectes_amb_loop AS (
    SELECT DISTINCT owner, name, type
    FROM all_source
    WHERE REGEXP_LIKE(text, '\bLOOP\b', 'i')
)
SELECT
    s.owner                                                AS esquema,
    s.name                                                 AS objecte,
    s.type                                                 AS tipus,
    s.line                                                 AS linia,
    SUBSTR(TRIM(s.text), 1, 200)                           AS codi,
    CASE
        WHEN REGEXP_LIKE(s.text, '\bCOMMIT\b', 'i')
             AND EXISTS (SELECT 1 FROM objectes_amb_loop ol
                         WHERE ol.owner = s.owner AND ol.name = s.name AND ol.type = s.type)
        THEN 'COMMIT_EN_OBJECTE_AMB_LOOP'
        WHEN REGEXP_LIKE(s.text, 'EXECUTE\s+IMMEDIATE\s*[^;]*\|\|', 'i')
        THEN 'EXECUTE_IMMEDIATE_CONCATENACIO'
        ELSE 'DBMS_OUTPUT_EN_PRODUCCIO'
    END                                                    AS tipus_problema,
    CASE
        WHEN REGEXP_LIKE(s.text, '\bCOMMIT\b', 'i')
             AND EXISTS (SELECT 1 FROM objectes_amb_loop ol
                         WHERE ol.owner = s.owner AND ol.name = s.name AND ol.type = s.type)
        THEN 'ALT'
        WHEN REGEXP_LIKE(s.text, 'EXECUTE\s+IMMEDIATE\s*[^;]*\|\|', 'i')
        THEN 'ALT'
        ELSE 'BAIX'
    END                                                    AS severitat,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI')        AS data_modificacio_objecte
FROM all_source s
JOIN dba_objects o
  ON o.owner = s.owner
 AND o.object_name = s.name
 AND o.object_type = s.type
WHERE s.owner IN (SELECT owner FROM esquemes_actius)
  AND s.type IN ('PROCEDURE', 'FUNCTION', 'PACKAGE BODY', 'TRIGGER', 'PACKAGE')
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
  AND (
      REGEXP_LIKE(s.text, 'DBMS_OUTPUT\s*\.\s*(PUT_LINE|PUT|NEW_LINE)', 'i')
      OR REGEXP_LIKE(s.text, 'EXECUTE\s+IMMEDIATE\s*[^;]*\|\|', 'i')
      OR (REGEXP_LIKE(s.text, '\bCOMMIT\b', 'i')
          AND EXISTS (SELECT 1 FROM objectes_amb_loop ol
                      WHERE ol.owner = s.owner AND ol.name = s.name AND ol.type = s.type))
  )
ORDER BY s.owner, s.name, severitat DESC, s.line;
```

---

```sql
-- =============================================================================
-- CHECK 12: CANDIDATS PER A BULK COLLECT / CÀRREGA MASSIVA
-- Severitat: MITJÀ
-- Criteri:
--   Objectes PL/SQL modificats en els últims N dies que processen files
--   una a una (FETCH INTO o DML en LOOP) sense BULK COLLECT ni FORALL.
--   Candidats a optimitzar amb BULK COLLECT + FORALL per a càrregues massives.
-- =============================================================================
WITH esquemes_valids AS (
    SELECT u.username AS owner
    FROM dba_users u
    WHERE u.oracle_maintained = 'N'
      AND u.username NOT IN (
          'SYS','SYSTEM','XDB','MDSYS','CTXSYS','DBSNMP','WMSYS','ORDSYS',
          'ORDDATA','OUTLN','GSMADMIN_INTERNAL','LBACSYS','DVSYS','AUDSYS',
          'APPQOSSYS','OJVMSYS','GGSYS','ANONYMOUS','SI_INFORMTN_SCHEMA'
      )
),
esquemes_actius AS (
    SELECT DISTINCT o.owner
    FROM dba_objects o
    JOIN esquemes_valids ev ON ev.owner = o.owner
    WHERE o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                              AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
),
objectes_amb_bulk AS (
    SELECT DISTINCT owner, name, type
    FROM all_source
    WHERE REGEXP_LIKE(text, '\bBULK\s+COLLECT\b|\bFORALL\b', 'i')
),
objectes_amb_fetch_individual AS (
    SELECT DISTINCT owner, name, type
    FROM all_source
    WHERE owner IN (SELECT owner FROM esquemes_actius)
      AND type IN ('PROCEDURE', 'FUNCTION', 'PACKAGE BODY')
      AND REGEXP_LIKE(text, '\bFETCH\s+\w+\s+INTO\b', 'i')
),
objectes_amb_dml_en_loop AS (
    SELECT DISTINCT s.owner, s.name, s.type
    FROM all_source s
    WHERE s.owner IN (SELECT owner FROM esquemes_actius)
      AND s.type IN ('PROCEDURE', 'FUNCTION', 'PACKAGE BODY')
      AND REGEXP_LIKE(s.text, '\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b', 'i')
      AND EXISTS (
          SELECT 1 FROM all_source s2
          WHERE s2.owner = s.owner AND s2.name = s.name AND s2.type = s.type
            AND REGEXP_LIKE(s2.text, '\bLOOP\b|\bFOR\s+\w+\s+IN\b', 'i')
      )
)
SELECT DISTINCT
    obj.owner                                              AS esquema,
    obj.name                                               AS objecte,
    obj.type                                               AS tipus,
    TO_CHAR(o.last_ddl_time, 'YYYY-MM-DD HH24:MI')        AS data_modificacio,
    CASE
        WHEN fi.owner IS NOT NULL AND dl.owner IS NOT NULL
        THEN 'FETCH fila a fila + DML en loop: candidat prioritari a BULK COLLECT+FORALL'
        WHEN fi.owner IS NOT NULL
        THEN 'FETCH fila a fila sense BULK COLLECT: revisar per optimitzar'
        ELSE 'DML en loop sense FORALL: considerar FORALL per a carrega massiva'
    END                                                    AS recomanacio,
    'MITJÀ'                                                AS severitat
FROM (
    SELECT owner, name, type FROM objectes_amb_fetch_individual
    UNION
    SELECT owner, name, type FROM objectes_amb_dml_en_loop
) obj
JOIN dba_objects o
  ON o.owner      = obj.owner
 AND o.object_name = obj.name
 AND o.object_type = obj.type
LEFT JOIN objectes_amb_bulk b
  ON b.owner = obj.owner AND b.name = obj.name AND b.type = obj.type
LEFT JOIN objectes_amb_fetch_individual fi
  ON fi.owner = obj.owner AND fi.name = obj.name AND fi.type = obj.type
LEFT JOIN objectes_amb_dml_en_loop dl
  ON dl.owner = obj.owner AND dl.name = obj.name AND dl.type = obj.type
WHERE b.owner IS NULL
  AND o.last_ddl_time BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
                          AND TO_DATE(:end_date,   'YYYY-MM-DD') + 1
ORDER BY obj.owner, obj.type, obj.name;
```
