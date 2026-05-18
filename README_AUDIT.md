# Manual d'Us: Sistema d'Auditoria Oracle

Aquest sistema esta dissenyat per automatitzar l'auditoria d'obsolescencia en entorns Oracle 19c amb el rigor d'un DBA Senior.

## Estructura del Projecte
- `src/core/`: Motors de connexio i carrega de dades.
- `src/analytics/`: Consultes SQL DBA i motor de classificacio de risc.
- `src/ui/`: Dashboard visual amb Streamlit.
- `src/web-app/`: Frontend React (Deep Scan, report MD/PDF).
- `config/`: Fitxers de configuracio (Credentials).

## IMPORTANT: Quin dashboard has arrencat?
Si no veus `Deep Scan`, `Configuracio` o el boto per descarregar el report, probablement estas executant el dashboard equivocat:

- Opcio A (Recomanada): Web unificat (React + FastAPI)
  Inclou `Deep Scan`, `Configuracio` (gestio de connexions) i el boto `Generar Report` (MD/PDF) a dalt a la dreta.
  Executa: `.\run.ps1`
  Obre: `http://127.0.0.1:8000`

- Opcio B: Streamlit multi-agent (`src/ui/app.py`)
  Inclou pestanya de `Configuracio` i descarrega d'Excel de resultats de consultes, pero no te `Deep Scan` ni reports MD/PDF.
  Executa: `streamlit run src/ui/app.py`

- Opcio C: Streamlit legacy (`dashboard.py`)
  Dashboard antic de snapshots/backlog; no inclou `Deep Scan` ni el sistema de reports MD/PDF.
  Executa: `streamlit run dashboard.py`

## Configuracio
1. Credencials: Assegura't que `config/Cadena_conexions.txt` conte els perfils (ex: `## E13DB`).
2. Entorn: El fitxer `config/.env` ha de tenir `DEFAULT_PROFILE` apuntant al perfil desitjat.
3. Instant Client: Si uses mode Thick, configura `ORACLE_CLIENT_LIB_DIR` al `.env`.

## Com executar-ho
### Streamlit (multi-agent)
```bash
streamlit run src/ui/app.py
```

### Web unificat (React + API)
```powershell
.\run.ps1
```
I despres obre `http://127.0.0.1:8000`.

## Validacio local
Per validar el backend i la generacio de reports post-CRQ, utilitza aquest comandament canonic:

```powershell
.\.venv\Scripts\python.exe -m unittest tests.test_post_crq_audit tests.test_checks_admin_router tests.test_report_generation tests.test_prova2_zip tests.test_automation
```

Notes:
- No facis servir `unittest discover` com a referencia principal per aquest repositori.
- Aquesta bateria comprova el motor post-CRQ, els endpoints FastAPI rellevants i la generacio de report Markdown/PDF.
- Les dependencies necessaries per a aquests checks estan declarades a `requirements.txt`, incloent `httpx`, `pypdf`, `xhtml2pdf` i `pytest`.

## Metriques d'Obsolescencia
El sistema analitza:
- Espai: Mida en GB per esquema.
- Activitat (DML/DDL): Deteccio de canvis en els ultims 90 dies (configurable).
- Risc bloquejant: Dependencies d'altres esquemes (`DBA_DEPENDENCIES`).
- Vida automatitzada: Jobs actius, Triggers i aplicacions APEX vinculades.

## Classificacio
- CRITIC: No eliminar (te dependencies o activitat recent).
- PRECAUCIO: Verificar components actius (Jobs/Triggers).
- SEGUR: Candidat a eliminacio (sense activitat ni dependencies detectades).
