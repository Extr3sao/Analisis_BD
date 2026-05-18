---
sidebar_position: 7
sidebar_label: 'Configuració General'
---

# Configuració General de l'Aplicació

El **Dashboard E13BD** requereix d'una configuració general de l'entorn i de serveis associats per al seu funcionament correcte. Aquesta configuració abasta des dels paràmetres locals de l'Oracle Instant Client fins a les claus d'accés per al mòdul d'Intel·ligència Artificial d'OpenRouter.

## Fitxer de variables d'entorn (`.env`)

A l'arrel de l'aplicació backend (`src/api/` o arrel del projecte), s'utilitza un fitxer `.env` per definir variables globals i de seguretat del sistema:

```env
# Configuració d'OpenRouter (IA)
OPENROUTER_API_KEY=sk-or-v1-****************************************
AI_MODEL=google/gemini-2.0-flash-lite-preview-02-05:free
OPENROUTER_ENABLED=True
OPENROUTER_TIMEOUT_MS=120000

# Configuració de l'Oracle Instant Client (Mode Thick)
ORACLE_HOME=C:\oracle\instantclient
PATH=C:\oracle\instantclient;%PATH%
```

---

## Configuració del Motor d'Intel·ligència Artificial (OpenRouter)

L'aplicació es connecta amb el proveïdor **OpenRouter** per disposar de models d'IA gratuïts o de pagament. El mòdul principal de diagnòstic semàntic PL/SQL (especialment per al `CHECK_11`) utilitza aquest servei.

### Paràmetres clau:

| Variable | Tipus | Rol | Descripció |
|----------|-------|-----|------------|
| **`OPENROUTER_API_KEY`** | Secret | Obligatori per a IA | Clau API subministrada per OpenRouter. |
| **`AI_MODEL`** | Cadena | Opcional | Model de llenguatge a cridar. Per defecte s'utilitza `google/gemini-2.0-flash-lite-preview-02-05:free`. |
| **`OPENROUTER_ENABLED`** | Booleà | Opcional | Si s'estableix a `False`, el motor d'IA es desactiva i es fan servir anàlisis pures deterministes (sense IA). |
| **`OPENROUTER_TIMEOUT_MS`** | Sencer | Opcional | Temps límit en mil·lisegons per a les crides a l'API (default: `120000` / 2 minuts) per evitar bloquejos. |

> [!NOTE]
> L'aplicació compta amb un sistema de **resiliència automatitzada**. Si l'API d'OpenRouter cau, dona un timeout o esgotem les quotes gratuïtes de crides, l'aplicació gestiona l'error de forma transparent i ofereix un fallback visual al dashboard, de manera que l'auditoria Post-CRQ finalitza correctament amb les dades crues d'Oracle.

---

## Configuració de l'Oracle Instant Client (`ORACLE_HOME`)

L'aplicació utilitza la llibreria **`python-oracledb`** en mode **Thick** per comunicar-se amb les bases de dades Oracle de forma robusta i asíncrona. Aquest mode requereix un client d'Oracle instal·lat a la màquina:

1. **Descarregar** l'Oracle Instant Client (Basic o Light) de la web oficial d'Oracle.
2. **Descomprimir** el contingut en una ruta coneguda (ex: `C:\oracle\instantclient`).
3. **Definir la variable d'entorn** `ORACLE_HOME` al fitxer `.env` apuntant a aquesta ruta.
4. **Afegir la ruta al PATH del sistema** perquè les DLLs d'Oracle siguin localitzables pel sistema operatiu durant l'execució.

> [!CAUTION]
> **Error DPI-1047**: Si el client d'Oracle no es troba al sistema o no s'ha definit correctament `ORACLE_HOME`, el backend fallarà amb aquest codi d'error en intentar llançar qualsevol auditoria. Cal reiniciar l'aplicació FastAPI després de modificar aquestes rutes al `.env`.

---

## Sincronització Automàtica de Checks (`auditoria_post_crq.md`)

Les consultes SQL de cada check d'auditoria es defineixen en un document mestre de tipus Markdown anomenat **`auditoria_post_crq.md`** situat a l'arrel de l'aplicació.

Per tal que el sistema importi, parsegi i actualitzi de forma automàtica la llista de checks a la base de dades local `internal.db` per a la interfície d'usuari:
- A la capçalera de controls d'execució del Dashboard, prem el botó blau **`Sinc. Checks`**.
- El backend llegirà el fitxer markdown, processarà el catàleg de checks, detectarà la seva criticitat, severitat i les estructures SQL, actualitzant a l'instant el panell de selecció sense haver de reiniciar el servei.

---

## Governança de Notificacions (`MailConfigView`)

L'aplicació compta amb una vista avançada de **Configuració de Notificacions** (`MailConfigView`) accesible des del menú principal per gestionar l'enviament asíncron d'informes de Post-CRQ.

### Canals integrats:
- **Correu Electrònic (SMTP)**: configuració de servidor de correu, port, usuari, contrasenya, protocol SSL/TLS, destinataris i llista de distribució oficial de l'E13BD.
- **Microsoft Teams**: URL de Webhook per a alertes automàtiques de canal de desenvolupament en cas de fallades de check d'auditoria de severitat `CRITIC`.
- **SharePoint / OneDrive**: paràmetres d'auto-desament i sincronització de bundles ZIP d'auditoria Post-CRQ.

Aquesta configuració es persisteix de manera totalment xifrada i independent de la lògica de base de dades a la base de dades SQLite **`internal.db`**.

