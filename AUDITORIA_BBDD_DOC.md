# Documentació Tècnica: Sistema d'Auditoria BBDD (Post-CRQ)

Aquesta documentació detalla el funcionament, l'arquitectura i la integració amb Intel·ligència Artificial del sistema d'Auditoria Post-CRQ per a bases de dades Oracle (E13BD).

## 1. Resum executiu
- **Arquitectura**: El sistema separa la definició lògica (SQL en Markdown) de l'execució tècnica (Python).
- **Flux Principal**: Lectura de Markdown -> Filtratge temporal/esquema -> Execució SQL a Oracle -> Anàlisi IA (Check 11) -> Generació de Report.
- **Integració IA**: El CHECK 11 detecta patrons N+1 ineficients i utilitza **OpenRouter** per classificar-los semànticament, reduint la càrrega de revisió manual del DBA.
- **Resiliència**: El client d'IA inclou mecanismes de *fallback* a models gratuïts i gestió d'errors per no interrompre l'auditoria si l'API falla.

## 2. Inventari complet de fitxers implicats

| Ruta | Nom | Tipus | Estat | Rol dins la funcionalitat |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `auditoria_post_crq.md` | SQL/Doc | `existent` | Font de veritat dels SQL. |
| `/` | `consultes_post_crq.txt` | Catàleg | `existent` | Índex per al motor de l'API. |
| `src/api/` | `post_crq_audit.py` | Python | `existent` | Orquestrador i motor d'execució. |
| `src/api/` | `post_crq_check11_ai.py` | Python | `existent` | Lògica de preparació i anàlisi IA. |
| `src/core/` | `openrouter_client.py` | Python | `existent` | Client de comunicació amb l'LLM. |
| `src/core/` | `report_design_agent.py` | Python | `existent` | Agent de disseny que dicta l'estructura dinàmica dels informes PDF i Markdown. |
| `config/` | `.env` | Config | `existent` | Variables d'entorn i claus API. |
| `src/api/` | `main.py` | Python | `existent` | Punt d'entrada de l'API FastAPI. |
| `src/api/` | `report_builder.py` | Python | `refactoritzat` | Genera els documents finals. |
| `src/web-app/src/views/` | `MailConfigView.jsx` | React | `nou` | Secció dedicada a la configuració global de notificacions (SMTP, Teams, SP). |
| `tests/` | `test_check11_ai.py` | Test | `existent` | Validació de la integració IA. |
| `src/core/` | `db_manager.py` | Python | `existent` | Gestor de connexions Oracle. |
| `data/` | `internal.db` | SQLite | `nou` | Cache IA i configuració. |
| `data/` | `automation.db` | SQLite | `nou` | Scheduler i logs d'execució. |

## 3. Explicació detallada fitxer a fitxer

### `auditoria_post_crq.md`
- **Funció**: Defineix els algorismes de detecció en SQL pur.
- **Entrades**: Bind variables com `:days_back`.
- **Impacte CHECK 11**: Conté la consulta complexa que identifica operacions SQL dins de línies de codi properes a un `LOOP`.

### `src/api/post_crq_audit.py`
- **Funció**: Orquestra tot el procés. Parseja el Markdown i executa les consultes en paral·lel.
- **Què hi passa dins**: Si el `check_id` és `CHECK_11`, invoca el mòdul d'IA després de rebre les dades d'Oracle. Si el check correspon a auditories basades en rangs temporals com el `CHECK_01`, s'encarrega d'injectar i lligar de forma dinàmica i segura les variables `:start_at` i `:end_at` rebuts del backend FastAPI.
- **Sortides**: Retorna un diccionari amb els resultats enriquits.

### `src/api/post_crq_check11_ai.py`
- **Funció**: "Traductor" entre dades SQL i llenguatge natural.
- **Què hi passa dins**: Construeix el prompt, envia els fragments de codi (`linies_detall`) a l'IA i interpreta el JSON de tornada. Interacciona amb la taula de cache a `internal.db` per evitar tornar a cridar a OpenRouter si el codi d'aquell objecte ja ha estat avaluat anteriorment i no ha canviat.
- **Impacte IA**: Defineix el `SYSTEM_PROMPT` que categoritza el risc.

### `src/core/report_design_agent.py` & `src/api/report_builder.py`
- **Funció**: `ReportDesignAgent` actua com a cervell de disseny que exposa un JSON de configuració de seccions de report. 
- **Què hi passa dins**: `report_builder.py` rep la informació i itera de manera dinàmica per generar l'HTML, el Markdown o el PDF d'acord amb el disseny subministrat.

### `src/web-app/src/views/MailConfigView.jsx`
- **Funció**: Mòdul central de governança de notificacions.
- **Què hi passa dins**: Gestiona la configuració global dels canals (Smtp, Teams, SharePoint). Separa la configuració tècnica de la de negoci.
- **Impacte**: Desacobla la configuració de la vista d'automatitzacions, millorant la UX/UI i la facilitat d'edició.

### BBDD Dual local (`internal.db` & `automation.db`)
- **internal.db**: Emmagatzema el catàleg de checks actius, credencials Oracle ofuscades via XOR, configuració de notificacions i la taula de cache del diagnòstic d'IA.
- **automation.db**: Conté la taula de programació del scheduler (diari/setmanal/mensual) i el log històric d'execucions.

---

## 4. Injecció Dinàmica de Paràmetres Temporals (Resolució del CHECK_01)

El `CHECK_01` té com a objectiu monitorar l'activitat i modificacions recents en taules d'auditoria crítiques. Per tal de permetre una finestra dinàmica d'execució d'auditoria que coincideixi exactament amb la durada d'una intervenció planificada (CRQ):

1. **Paràmetres dinàmics**: El backend en FastAPI exposa els paràmetres de data d'inici (`&start_at`) i data de finalització (`&end_at`).
2. **Validació robusta**: El backend valida prèviament que el format de les dates introduïdes sigui estrictament `YYYY-MM-DD` abans d'iniciar el flux de connexió amb Oracle.
3. **Injecció segura a la query mestre**: En lloc de concatenar cadenes a la consulta (risc d'infecció de SQL i pèrdua de rendiment), `post_crq_audit.py` i l'Audit Engine transformen les referències de la query (`:start_at` i `:end_at`) en variables d'enllaç dinàmiques (bind variables).
4. **Execució Oracle**: La llibreria `python-oracledb` compila correctament el pla d'execució a Oracle, reduint l'ús de CPU de la instància i evitant errors de "prevalidation failed" o errors tipogràfics de format de data.

---

## 5. Relació entre fitxers i components
El sistema es basa en un acoblament flexible:
- **Flux de dades**: `Markdown` -> `Audit Orchestrator` -> `Oracle DB` -> `Data Enrichment (IA)` -> `Report Design Agent` -> `Report Builder`.
- **Flux de control**: L'orquestrador (`post_crq_audit.py`) controla el paral·lelisme i decideix si crida a l'IA segons si hi ha files al CHECK 11 i si `OPENROUTER_ENABLED` és cert.
- **Renderització**: L'estructura de l'informe depèn completament del `ReportDesignAgent`, el qual defineix en format llista interactiva les seccions (Context, Summary, Metrics, AI Diagnostics) i l'estil, perquè el `builder` generi el PDF o MD recursivament.

---

## 6. Diagrama Mermaid de components (Arquitectura d'Agents i Skills)

```mermaid
graph TD
    subgraph UI["Capa de Presentació"]
        Dash["Dashboard Web (React)"]
    end

    subgraph Orch["Orquestració i Lògica"]
        Main["main.py (FastAPI)"]
        Engine["post_crq_audit.py (Engine)"]
        In["auditoria_post_crq.md (SQL Logic)"]
    end

    subgraph Anti_Agents["Agents Autònoms (Antigravity i Governança)"]
        Orchestrator["orchestrator-e13bd (Orquestrador)"]
        Architect["architect-e13bd (Arquitectura)"]
        Developer["developer-e13bd (Desenvolupament)"]
        Tester["tester-e13bd (QA i Test)"]
        DBA["dba-e13bd (DBA Expert)"]
        Reporter["insights-reporting-e13bd (PDFs i BI)"]
    end

    subgraph Internal_Agents["Agents Interns (Runtime)"]
        Auditor["AI Auditor Agent (Check 11)"]
        Designer["Report Design Agent (Estil)"]
        ATIC_Rep["ATIC Reporting Agent (Format)"]
    end

    subgraph Skills["Capacitats i Skills"]
        DBS["Database Skill (DBManager)"]
        AIS["AI Skill (OpenRouterClient)"]
        RepS["Report Builder Skill (Logic/Score)"]
    end

    User(["Usuari"]) --> Orchestrator
    Orchestrator --> Architect
    Architect --> Developer
    Developer --> Tester
    Orchestrator --> DBA
    Orchestrator --> Reporter
    
    Reporter --> Dash
    Dash -- "Sol·licita report" --> Main
    Main -- "Executa" --> Engine
    Engine -- "Llegeix" --> In
    Engine -- "Invoca" --> DBS
    DBS -- "SQL" --> DB[("Oracle DB")]
    
    Engine -- "Enriqueix" --> Auditor
    Auditor -- "Context" --> AIS
    AIS -- "Prompt" --> LLM["OpenRouter LLM"]
    
    Engine -- "Genera Dades" --> RepS
    RepS -- "Aplica Scores" --> ATIC_Rep
    ATIC_Rep -- "PDF/MD (Gesin's ATIC)" --> Out["Resultat Final"]
```

---

## 7. Diagrama Mermaid del flux d’execució (Agentic Flow)

```mermaid
sequenceDiagram
    participant User as Usuari / Antigravity
    participant Orch as orchestrator-e13bd
    participant DBA as dba-e13bd
    participant Dev as developer-e13bd
    participant API as main.py (FastAPI)
    participant Engine as audit_engine
    participant DB as Database Skill
    participant Agent as AI Auditor Agent
    participant RepBuilder as Report Builder Skill
    participant ATIC as ATIC Reporting Agent
    participant Reporter as insights-reporting-e13bd
    
    User->>Orch: Demana millores / auditoria
    Orch->>DBA: Valida i descriu els checks SQL
    DBA-->>Orch: Retorna queries validades
    Orch->>Dev: Implementa canvis a fitxers
    
    User->>API: Sol·licita Auditoria Post-CRQ
    API->>Engine: Inicialitza Procés (run_post_crq)
    Engine->>DB: Executa Consultes SQL (Q01-Q19)
    DB-->>Engine: Dades Brutes (Oracle Rows)
    
    Note over Engine, Agent: Si detecta CHECK 11 (N+1)
    Engine->>Agent: Analitza ineficiències codi (Chunking AI)
    Agent->>Agent: Avalua Semàntica (OpenRouter)
    Agent-->>Engine: Classificació (Mala Praxi / Fals Positiu)
    
    Engine->>RepBuilder: Sol·licita Càlcul de Scores
    RepBuilder->>RepBuilder: Aplica Lògica E13BD (0-100) i Agrupació Lot
    RepBuilder-->>Engine: Dades Estructurades
    
    Engine->>ATIC: Genera Document Final iterant JSON
    ATIC->>ATIC: Signatura Gesin's ATIC & Estils
    ATIC-->>Engine: Report Final (Styles Applied)
    
    Engine-->>API: JSON / PDF Consolidat
    API-->>Reporter: Interpreta les Sortides
    Reporter-->>User: Visualització Resultats Globals
```

---

## 8. Guia pas a pas
1. **Definició**: S'afegeix o modifica un check a `auditoria_post_crq.md`.
2. **Setup**: Es configura la `OPENROUTER_API_KEY` al `.env`.
3. **Crida**: Es demana l'execució via Swagger o Dashboard UI.
4. **Processament**: El sistema filtra per esquemes i rang temporal.
5. **IA**: Per cada fila del CHECK 11, l'IA avalua si és `mala_praxis` (risc real) o `falso_positivo`.
6. **Resultat**: Es lliura un JSON consolidat.

---

## 9. Configuració i Variables d’Entorn

| Variable | Obligada | Descripció | On s'utilitza |
| :--- | :--- | :--- | :--- |
| `OPENROUTER_API_KEY` | Sí | Clau per analitzar el codi PL/SQL via OpenRouter. | `openrouter_client.py` |
| `AI_MODEL` | No | Model d'IA utilitzat (per defecte google/gemini-2.0-flash-lite-preview-02-05:free). | `openrouter_client.py` |
| `OPENROUTER_ENABLED` | No | Si és `False`, el CHECK 11 no tindrà anàlisi d'IA. | `post_crq_audit.py` |
| `OPENROUTER_TIMEOUT_MS` | No | Temps d'espera (ms) per a la resposta de l'IA. | `openrouter_client.py` |

---

## 10. Scripts i Punts d’Entrada
- **API**: `uvicorn src.api.main:app --reload`.
- **Endpoint**: `/api/audit/post-crq/run`.
- **Paràmetres**: `profile` (connexió), `days_back`, `schemas`, `start_at`, `end_at`.

---

## 11. Validacions i tests
El fitxer `tests/test_check11_ai.py` valida:
- Que el parser de Markdown detecti el CHECK 11.
- Que la resposta de l'IA es fusioni correctament amb les columnes d'Oracle.
- El comportament quan l'API Key és invàlida (error controlat).

---

## 12. Buits, riscos i dependències
- **Falsos segons**: Un timeout a l'API d'OpenRouter pot deixar el CHECK 11 sense anàlisi IA (fallback controlat).
- **Buits resolts**: S'ha implementat amb èxit un sistema de **caching local SQLite** a `internal.db` per a les respostes d'IA del `CHECK_11`, evitant costos addicionals de crida.
- **Risc**: Seguretat del codi enviat a una API externa (revisar polítiques de privacitat).

---

## 13. Resum final accionable
- **Fitxers Crítics**: `post_crq_audit.py` i `auditoria_post_crq.md`.
- **Lectura recomanada**: Començar pel Markdown per entendre la lògica DB i seguir per `post_crq_check11_ai.py` per l'anàlisi semàntic.
- **Propers Passos**: Mantenir actualitzades les definicions SQL dels checks en harmonia amb la base de dades i implementar visualització HUD al frontend per als resultats d'IA.
