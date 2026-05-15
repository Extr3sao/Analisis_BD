---
sidebar_position: 11
sidebar_label: 'Glossari tècnic'
---

# Glossari de termes tècnics

Referència ràpida de tots els termes i acrònims específics del **Dashboard E13BD**.

---

## A

### Agent IA
Mòdul de programari autònom que realitza una tasca especialitzada de forma autònoma. Al Dashboard, els agents principals són: `AI Auditor Agent` (classifica codi N+1), `Report Design Agent` (genera el JSON de configuració visual), i els agents de desenvolupament (orchestrator, architect, developer, tester, dba).

### API (Application Programming Interface)
Interfície que exposa el backend FastAPI per comunicar-se amb el frontend React. Totes les rutes comencen per `/api/`.

### `auditoria_post_crq.md`
Fitxer Markdown font que defineix tots els checks (Q01–Q19) de l'auditoria. El backend el llegeix per construir la llista de checks disponibles. Cada check inclou: identificador, títol, query SQL, criticitat i descripció funcional.

---

## B

### Backend
Component servidor de l'aplicació, desenvolupat amb **FastAPI** (Python). Gestiona les connexions Oracle, l'execució de checks, la generació d'informes i la comunicació amb la IA.

### BAIX
Nivell de criticitat baix. Indica una millora recomanable però no urgent. Es representa amb fons blau clar a la interfície.

---

## C

### CHECK / Check
Cadascuna de les comprovacions tècniques que el sistema executa contra Oracle. S'identifiquen com `CHECK_01`, `CHECK_02`... fins `CHECK_19` (o similars). Cada check executa una query SQL específica.

### CHECK_11
Check de **qualitat de codi PL/SQL** (Severitat: ALT). Detecta la proximitat heurística entre sentències d'inici de bucle (`LOOP`, `FOR ... IN`) i operacions DML (`INSERT INTO`, `UPDATE`, `DELETE FROM`, `SELECT ... INTO`) en menys de 25 línies dins d'objectes modificats recentment que no usen `BULK COLLECT` ni `FORALL`. **És un check SQL estàndard, sense integració d'IA.**

### CHECK_12
Check de **candidats per a Bulk Collect** (Severitat: BAIX). Identifica codi PL/SQL que processa files una a una (`FETCH ... INTO` sense `BULK COLLECT`/`FORALL`). Retorna la columna `recomanacio` amb el patró detectat i el tipus d'optimització recomanada.

### CRÍTIC
Nivell de criticitat màxim (`CRITIC`). Indica un problema que requereix acció immediata. Es representa amb fons vermell intens i texte en negreta.

### CRQ (Change Request)
Canvi de software planificat que s'aplica a la base de dades Oracle. L'auditoria Post-CRQ verifica que el canvi s'ha aplicat correctament i no ha introduït problemes de qualitat.

---

## D

### `db_manager.py`
Mòdul Python que gestiona la connexió d'alt rendiment amb Oracle en mode Thick (via `python-oracledb`) i executa les queries de cada check.

### DPI-1047
Error d'Oracle Instant Client que indica que les biblioteques de connexió no s'han trobat al sistema. Solució: configurar `ORACLE_HOME`.

---

## E

### Esquema (Schema)
Nom d'un usuari o espai de noms d'Oracle que conté objectes (taules, vistes, procediments). Els checks s'executen sobre un o més esquemes Oracle específics.

---

## F

### Fals positiu
Resultat d'un anàlisi (manual o automàtica) en què un objecte sembla contenir un problema però en realitat és un còdi correcte. En el context del CHECK_11, un fals positiu és un objecte que supera el criteri heurístic de proximitat LOOP+DML però que en una revisió manual no es considera un problema real.

### FastAPI
Framework Python d'alt rendiment per construir APIs REST asíncrones. S'usa com a servidor backend del Dashboard.

### Frontend
Component client de l'aplicació, desenvolupat amb **React 19 + Vite + Tailwind CSS**. El que l'usuari veu i interactua en el navegador.

---

## I

### `internal.db`
Base de dades SQLite local on es persisten: configuració de connexions, jobs d'automatització, historial d'execucions i altres metadades de l'aplicació.

---

## J

### Job (Automatització)
Tasca programada que executa una auditoria Post-CRQ automàticament en una freqüència configurada (diària, setmanal, mensual). Es configura a la secció d'**Automatitzacions**.

---

## L

### Lot
Agrupació d'objectes Oracle associada a un proveïdor o unitat de desplegament específica. Els resultats de l'auditoria es segmenten per lot per facilitar la distribució d'informes a cada proveïdor.

---

## M

### `manifest.json`
Fitxer JSON inclòs dins el ZIP de descàrrega. Conté metadades de traçabilitat: data d'execució, perfil usat, checks executats, lots detectats i resum de troballes.

### Mala praxi
Pauta de programació desaconsellada. En el context de l'auditoria post-CRQ, inclou patrons com: DML dins de bucles sense `BULK COLLECT`/`FORALL`, gestió genèrica d'errors `WHEN OTHERS THEN NULL`, constraints deshabilitades, sequències sense caché, etc.

### MITJÀ / MITJA
Nivell de criticitat intermedi (`MITJA`). Indica un problema d'impacte potencial que cal revisar. Es representa amb fons taronja.

---

## N

### N+1 (patró)
Anti-patró de programació on una consulta SQL s'executa repetidament dins d'un bucle (N vegades), generant un nombre excessiu de cridades a la base de dades i degradant el rendiment. El **CHECK_11** detecta proximitat heurística LOOP+DML que pot indicar aquest patró.

---

## O

### OpenRouter
Servei d'API unificada per accedir a models de llenguatge IA (LLM) de múltiples proveïdors (Llama, GPT, etc.). El Dashboard utilitza OpenRouter per a la generació de resums i anàlisis d'informes on la IA està activada (configuració via `OPENROUTER_API_KEY`).

### ORA-XXXXX
Codis d'error d'Oracle. Exemples comuns: `ORA-01017` (credencials incorrectes), `ORA-12514` (SID no trobat), `ORA-12541` (listener no disponible).

### Oracle Instant Client
Biblioteques client lleugeres d'Oracle que permeten connectar a una base de dades Oracle sense instal·lar el client complet. Necessari per al mode Thick de `python-oracledb`.

---

## P

### Perfil de connexió
Configuració guardada per accedir a una instància Oracle: nom, host, port, SID, usuari i contrasenya ofuscada. Es crea i gestiona a la pantalla de **Configuració**.

### Post-CRQ
Auditoria que s'executa **després** d'aplicar un CRQ per verificar la integritat dels objectes modificats.

### `python-oracledb`
Biblioteca Python de connexió a Oracle. El Dashboard usa el **mode Thick** (requereix Oracle Instant Client) per màxim rendiment i compatibilitat.

---

## Q

### Q01–Q19
Identificadors numèrics dels checks d'auditoria. Cada Qxx correspon a un `CHECK_XX` definit al fitxer `auditoria_post_crq.md`.

---

## R

### `report_builder.py`
Mòdul Python que transforma els resultats de l'auditoria en documents Markdown i PDF, aplicant el **Score E13BD** per prioritzar les troballes.

### `report_design_agent.py`
Agent IA que genera el JSON de configuració visual per als informes (colors, seccions, format), actuant com a "cervell de disseny" del sistema de reporting.

---

## S

### Score E13BD
Sistema de puntuació intern que pondera les troballes de l'auditoria per criticitat i impacte. S'aplica durant la generació de l'informe per prioritzar els problemes més urgents.

### SID (System Identifier)
Identificador únic d'una instància de base de dades Oracle. Exemple: `ORCL`, `E13BD`. Alternativament es pot usar el **Service Name**.

### Scheduler (planificador)
Component de FastAPI que gestiona l'execució concurrent dels checks. Paràmetres clau: `max_concurrency`, `max_retries`, `enable_auto_throttle`.

---

## T

### Termini (dies)
Nombre de dies recomanats per resoldre una incidència detectada en un lot. S'especifica a les dades del lot en l'informe.

### Topbar
Barra de capçalera superior de l'aplicació que conté el logo institucional, el títol `Oracle Audit` i el selector de connexió activa.

---

## V

### Vite
Eina de build i servidor de desenvolupament per a la part frontend (React). Compila i optimitza l'aplicació React per a producció.

---

## X

### XOR (ofuscació)
Tècnica d'ofuscació aplicada a les contrasenyes de connexió emmagatzemades a `internal.db`. No és xifrat criptogràfic, però evita l'exposició en text pla al fitxer de base de dades local.

---

## Z

### ZIP
Format d'arxiu comprimit que el sistema genera quan es selecciona la variant `Tots` en la descàrrega d'informes. Conté un PDF per cada lot + el resum general + el `manifest.json`.
