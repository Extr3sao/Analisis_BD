# Mapatge checks -> incidències prioritzades

Aquest document descriu com s'adapta la sortida de cada check perquè la taula de les incidències prioritzades del report mostri una informació compacta, homogènia i orientada a l'acció.

## CHECK_01 — Taules recents sense primary key

**1. Què detecta**  
Detecta taules modificades recentment que no tenen cap `PRIMARY KEY` activa.

**2. Informació recomanada per a la taula del report**  
Nom de la taula, tipus d'objecte i una síntesi del volum, les estadístiques i la darrera modificació estructural.

**3. Mapeig SQL → visual**  
- `taula` → `OBJECTE`
- `'TABLE'` → `TIPUS`
- `num_rows + darrera_estadistica + data_modificacio_objecte + absència PK` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
La consulta base es manté. El pipeline transforma la fila a:
- `OBJECTE = taula`
- `TIPUS = TABLE`
- `DADA TÈCNICA = Sense PK activa · Volum estimat: ... · Estadístiques: ... · DDL: ...`

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| ME_CENTRES_ENSENYAMENT_LOAD | TABLE | Sense PK activa · Volum estimat: 135.073 files · Estadístiques: 2026-03-12 · DDL: 2026-03-12 12:57 |

**6. Impacte sobre el pipeline**  
S'ha corregit l'alias `num_files` a `num_rows` al SQL i el render final ja no mostra la columna `severitat` en la taula prioritzada.

## CHECK_02 — Taules recents sense índexs

**1. Què detecta**  
Detecta taules modificades recentment que no tenen cap índex definit.

**2. Informació recomanada per a la taula del report**  
Nom de la taula, tipus i resum del volum, l'estat de les estadístiques i la darrera DDL.

**3. Mapeig SQL → visual**  
- `taula` → `OBJECTE`
- `'TABLE'` → `TIPUS`
- `num_rows + darrera_estadistica + data_modificacio_objecte + absència d'índex` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
La fila es transforma a:
- `OBJECTE = taula`
- `TIPUS = TABLE`
- `DADA TÈCNICA = Sense índex actiu · Volum estimat: ... · Estadístiques: ... · DDL: ...`

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| WORK_MUNICIPIS | TABLE | Sense índex actiu · Volum estimat: 24.180 files · Estadístiques: 2026-03-11 · DDL: 2026-03-11 08:42 |

**6. Impacte sobre el pipeline**  
S'aplica el mateix model que al CHECK_01 i es reutilitza la columna `num_rows`.

## CHECK_03 — Seqüències recents sense cache o amb cache insuficient

**1. Què detecta**  
Detecta seqüències recents amb `NOCACHE` o amb un valor de `CACHE` massa baix segons una heurística basada en `increment_by`.

**2. Informació recomanada per a la taula del report**  
Nom de la seqüència, tipus, dades de cache i una observació operativa si hi ha justificació o recomanació.

**3. Mapeig SQL → visual**  
- `sequencia` → `OBJECTE`
- `'SEQUENCE'` → `TIPUS`
- `cache_actual + increment_by_value + problema + cache_recomanada` → `DADA TÈCNICA`
- `justificacio` → `OBSERVACIÓ`

**4. SELECT adaptat per a incidències prioritzades**  
La fila es transforma a:
- `OBJECTE = sequencia`
- `TIPUS = SEQUENCE`
- `DADA TÈCNICA = CACHE ... · INCREMENT ... · ... · Cache recomanada: ...`

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| RTT_SEQ_EXPEDIENT | SEQUENCE | CACHE 0 · INCREMENT 1 · NOCACHE · Cache recomanada: 50 |

**6. Impacte sobre el pipeline**  
S'ha corregit l'alias `increment_by` a `increment_by_value` i s'ha eliminat `severitat` de la taula prioritzada.

## CHECK_04 — Foreign keys recents sense índex de suport

**1. Què detecta**  
Detecta claus foranes recents que no disposen d'un índex de suport útil a la taula filla.

**2. Informació recomanada per a la taula del report**  
Nom de la FK, tipus i resum de la taula afectada, columnes implicades i taula pare.

**3. Mapeig SQL → visual**  
- `constraint_fk` / `nom_constraint` → `OBJECTE`
- `'FOREIGN KEY'` → `TIPUS`
- `taula + columnes_fk + taula_pare + data_modificacio_taula` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
La fila es transforma a:
- `OBJECTE = nom de la constraint`
- `TIPUS = FOREIGN KEY`
- `DADA TÈCNICA = FK sense índex de suport · Taula: ... · Columnes: ... · Taula pare: ... · DDL: ...`

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| FK_EXPEDIENT_SOL | FOREIGN KEY | FK sense índex de suport · Taula: RTT_SOLLICITUD · Columnes: ID_EXPEDIENT · Taula pare: RTT_EXPEDIENT · DDL: 2026-03-11 09:10 |

**6. Impacte sobre el pipeline**  
Cap canvi funcional al SQL, però la presentació final compacta la informació rellevant en una sola columna tècnica.

## CHECK_05 — Constraints recents deshabilitades

**1. Què detecta**  
Detecta constraints recents deshabilitades o no validades.

**2. Informació recomanada per a la taula del report**  
Nom de la constraint, tipus i resum de taula, estat, validació i DDL.

**3. Mapeig SQL → visual**  
- `nom_constraint` → `OBJECTE`
- `tipus_constraint` → `TIPUS`
- `taula + estat + validada + data_modificacio_taula` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
Transformació a `OBJECTE`, `TIPUS` i `DADA TÈCNICA` compacta.

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| CHK_IMPORT_OBLIGATORI | CHECK | Taula: IMPORTS_DOCENTS · Estat: DISABLED · Validada: NOT VALIDATED · DDL: 2026-03-10 17:25 |

**6. Impacte sobre el pipeline**  
La taula prioritzada ja no replica `estat`, `validada` i `severitat` com a columnes separades.

## CHECK_06 — Índexs duplicats recents

**1. Què detecta**  
Detecta índexs recents potencialment redundants perquè comparteixen la mateixa columna líder.

**2. Informació recomanada per a la taula del report**  
Nom de l'índex detectat com a objecte i una síntesi amb taula, índex parella i columna líder comuna.

**3. Mapeig SQL → visual**  
- `index_1` → `OBJECTE`
- `'INDEX'` → `TIPUS`
- `taula + index_2 + columna_lider_comuna + tipus_1/tipus_2` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
Transformació a `OBJECTE = index_1`, `TIPUS = INDEX`, `DADA TÈCNICA = Duplicat potencial · ...`

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| IX_SOL_ID_EXP | INDEX | Duplicat potencial · Taula: RTT_SOLLICITUD · Índex relacionat: IX_SOL_EXP_ALT · Columna líder: ID_EXPEDIENT |

**6. Impacte sobre el pipeline**  
La taula operativa evita mostrar les dues definicions completes en columnes amples i prioritza un resum funcional.

## CHECK_07 — Objectes recents invàlids

**1. Què detecta**  
Detecta objectes Oracle recents en estat `INVALID`.

**2. Informació recomanada per a la taula del report**  
Nom de l'objecte, tipus i context de darrera modificació o invalidació.

**3. Mapeig SQL → visual**  
- `objecte` → `OBJECTE`
- `tipus_objecte` → `TIPUS`
- `data_modificacio_objecte + estat invalid` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
Transformació a `OBJECTE`, `TIPUS` i resum de data/estat.

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| FIE_MAPAES_ENSENYAMENTS_VM | MATERIALIZED VIEW | Estat INVALID · Darrera modificació: 2026-03-11 16:54 |

**6. Impacte sobre el pipeline**  
Cap. El renderer prioritza l'impacte del lot i deixa el detall de compilació per al bloc tècnic.

## CHECK_08 — Columnes NUMBER sense precisió ni escala

**1. Què detecta**  
Detecta columnes `NUMBER` definides sense precisió ni escala en objectes recents.

**2. Informació recomanada per a la taula del report**  
Nom de la columna com a objecte i resum de taula, nullable i posició.

**3. Mapeig SQL → visual**  
- `columna` → `OBJECTE`
- `'COLUMN'` → `TIPUS`
- `taula + nullable + posicio` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
Transformació a `OBJECTE = columna`, `TIPUS = COLUMN`, `DADA TÈCNICA = Taula: ... · Nullable: ... · Posició: ...`

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| IMPORT_BASE | COLUMN | Taula: RRHH_NOMINA_DOCENT · Nullable: N · Posició: 7 |

**6. Impacte sobre el pipeline**  
Cap. El detall cru es manté al bloc tècnic; la incidència prioritzada només mostra el resum interpretat.

## CHECK_09 — Sinònims recents trencats

**1. Què detecta**  
Detecta sinònims recents que apunten a un destí inexistent o no resoluble.

**2. Informació recomanada per a la taula del report**  
Nom del sinònim, tipus i resum del destí esperat i l'estat detectat.

**3. Mapeig SQL → visual**  
- `sinonim` → `OBJECTE`
- `'SYNONYM'` → `TIPUS`
- `desti + problema` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
Transformació a objecte i dada tècnica compacta.

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| SYN_EXPEDIENT_HIST | SYNONYM | Destí inexistent · Objecte esperat: RTT_EXPEDIENT_HIST |

**6. Impacte sobre el pipeline**  
Cap. El report prioritza el missatge funcional i no mostra el camp de severitat a la taula.

## CHECK_10 — Ús de WHEN OTHERS THEN NULL en codi recent

**1. Què detecta**  
Detecta fragments de codi recents on hi ha una captura d'errors `WHEN OTHERS THEN NULL`.

**2. Informació recomanada per a la taula del report**  
Objecte PL/SQL afectat, tipus i resum de línia/codi observat.

**3. Mapeig SQL → visual**  
- `objecte_plsql` → `OBJECTE`
- `tipus_objecte` → `TIPUS`
- `linia + patro detectat` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
Transformació a una fila resumida per objecte i línia rellevant.

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| AWA_PG_USUARIS | PACKAGE BODY | Línia 284 · Patró `WHEN OTHERS THEN NULL` detectat sense traça ni re-raise |

**6. Impacte sobre el pipeline**  
Cap. La severitat es manté només per ordenar i prioritzar.

## CHECK_11 — Problemes de codi en paquets/procedures/funcions

**1. Què detecta**  
Detecta patrons de codi PL/SQL problemàtics, especialment SQL dins de bucles o operacions fila a fila.

**2. Informació recomanada per a la taula del report**  
Objecte PL/SQL, tipus i resum del patró detectat, línies sospitoses i observació funcional.

**3. Mapeig SQL → visual**  
- `objecte_plsql` → `OBJECTE`
- `tipus_objecte` → `TIPUS`
- `linies_sospitoses_en_loop + observacio` → `DADA TÈCNICA`
- `explicacio_ia` o justificació curta → `OBSERVACIÓ`

**4. SELECT adaptat per a incidències prioritzades**  
La fila es converteix a un resum curt per objecte; la classificació IA queda fora de la taula i es mostra al resum especial si escau.

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| PKG_BATCH_X | PACKAGE BODY | 3 línies sospitoses dins de LOOP · Patró fila a fila amb SQL potencialment massiu |

**6. Impacte sobre el pipeline**  
S'ha mantingut l'enriquiment IA, però la taula prioritzada només consumeix el resum estructurat.

## CHECK_12 — Candidats per a BULK COLLECT / Càrrega massiva

**1. Què detecta**  
Detecta objectes candidats a tractament bulk o optimització per càrrega massiva.

**2. Informació recomanada per a la taula del report**  
Objecte PL/SQL, tipus i resum del patró detectat, volum de codi o senyal de procés massiu.

**3. Mapeig SQL → visual**  
- `objecte_plsql` → `OBJECTE`
- `tipus_objecte` → `TIPUS`
- `linies_sospitoses + volum + patró massiu` → `DADA TÈCNICA`

**4. SELECT adaptat per a incidències prioritzades**  
Transformació resumida equivalent al CHECK_11, però orientada a bulk i càrrega massiva.

**5. Exemple de sortida final**
| OBJECTE | TIPUS | DADA TÈCNICA |
|---|---|---|
| PRC_CARREGA_DOCENTS | PROCEDURE | Càrrega massiva sense evidència de BULK COLLECT/FORALL · Revisar procés batch |

**6. Impacte sobre el pipeline**  
Cap canvi de render més enllà de compactar la dada tècnica i eliminar `severitat` de la taula prioritzada.
