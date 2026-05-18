---
sidebar_position: 7.5
sidebar_label: 'Connexions Oracle'
---

# Gestió de Connexions Oracle

Les connexions a bases de dades permeten que el **Dashboard E13BD** pugui accedir a les instàncies Oracle per executar les consultes d'auditoria. Cada connexió es guarda de forma local i persistent a la base de dades interna de l'aplicació.

---

## On es guarden les connexions

Les connexions es persisten de manera centralitzada a **`internal.db`**, una base de dades SQLite local integrada al backend de FastAPI. Cada perfil de connexió emmagatzemat conté:
- Un identificador únic de base de dades.
- Dades generals d'enllaç (host, port, SID / Service Name).
- Nom de l'usuari de l'esquema Oracle a auditar.
- Contrasenya de l'usuari **ofuscada** (mai sota text pla) mitjançant un algorisme XOR simple via `crypto_utils.py`.
- Metadades addicionals (estat activa/inactiva, descripció corporativa, flag de xifrat SSL).

> [!CAUTION]
> L'ofuscació XOR protegeix contra consultes simples o lectures en cru del fitxer SQLite local, però **no és un xifrat criptogràfic d'alt nivell**. Es recomana enèrgicament **no emmagatzemar credencials d'usuaris amb privilegis de DBA, SYS o SYSDBA**. Utilitzeu usuaris específics d'auditoria amb els mínims privilegis necessaris.

---

## Pantalla de Connexions a BBDD

Pots administrar de forma visual les connexions a través de la pestanya **Configuració** de la interfície:

- **Taula de connexions**: Llista de totes les connexions guardades al catàleg.
- **Botó principal**: `+ Nova connexió` (obre el formulari de creació en format modal).

### Columnes de la taula:

| Columna | Descripció |
|---------|-----------|
| **Nom de la connexió** | Descripció o àlies llegible del servidor Oracle |
| **Tipus** | Tipus de BBDD (`ORACLE`, `SQLITE`, `POSTGRESQL`, `MYSQL`) |
| **Servidor** | Host IP i Port d'Oracle (ex: `10.120.40.10:1521`) |
| **Base de dades** | SID o Service Name de la instància Oracle |
| **Usuari** | Credencial de l'esquema d'auditoria |
| **Estat** | Activa (en verd) o Inactiva (en gris; es descarta al selector d'auditoria) |
| **Accions** | Controls directes de provar, editar i eliminar |

---

## Formulari de connexió (Modal)

S'obre en format modal a la pantalla en prémer `+ Nova connexió` o l'acció d'editar un perfil existent.

### Camps de configuració:

| Camp | Tipus | Obligatori | Exemple | Rol / Notes |
|------|-------|-----------|---------|-------------|
| **Nom de la connexió** | Text | ✅ Sí | `Oracle Preproducció E13BD` | Nom corporatiu de visualització |
| **Tipus** | Desplegable | ✅ Sí | `Oracle` | Driver de BBDD a inicialitzar |
| **Servidor (Host)** | Text | ✅ Sí | `10.120.40.10` | IP o hostname de destí |
| **Port** | Text | No | `1521` | Port TCP de connexió d'Oracle (default: 1521) |
| **Base de dades (SID)** | Text | ✅ Sí | `E13BDPRE` | SID de la instància Oracle a connectar |
| **Usuari** | Text | No | `USR_AUDIT_E13BD` | Usuari de connexió |
| **Contrasenya** | Password | No | `*******` | En edició: deixar en blanc per mantenir l'actual |
| **Descripció** | Àrea text | No | `Connexió de preproducció per a checks Post-CRQ` | Notes del sistema |
| **Activa** | Checkbox | — | ✅ Activat | Permet que s'inclogui al selector superior |
| **Utilitzar SSL** | Checkbox | — | Desactivat | Habilita enllaços TCPS amb carteres d'Oracle |

---

## Accions i provatura en temps real

Cada fila de connexió conté tres botons d'acció ràpida:

1. **Provar Connexió (▶ Play)**: 
   - Llença una crida instantània al backend (`POST /api/database-connections/{id}/test`) que intenta inicialitzar el driver `python-oracledb` i establir un enllaç de prova amb la credencial.
   - Retorna un missatge visual de validació: `Connexió establerta correctament` (verd) o el codi d'error en vermell (ex: `ORA-01017`).
2. **Editar (✏️)**: obre el modal carregat amb el contingut actual per a actualitzacions.
3. **Eliminar (🗑️)**: demana confirmació abans d'eliminar de forma permanent el registre de `internal.db`.

---

## Importació de Connexions Tradicionals

L'aplicació compta amb un mecanisme asíncron per facilitar la migració de connexions legacy. Si disposeu d'un fitxer clàssic **`config/Cadena_conexions.txt`** a l'entorn de treball:
- El backend detectarà la seva existència i la processarà per lots.
- Extraurà els paràmetres (Nom, Usuari, Contrasenya, DSN), els ofuscarà i els inserirà automàticament a la taula visual de bases de dades perquè pugueu gestionar-les de forma senzilla.

---

## Resolució d'Errors Oracle Comuns

| Codi d'Error | Causa Probable | Solució Recomanada |
|--------------|----------------|--------------------|
| **`DPI-1047`** | Oracle Instant Client no trobat | Revisa `ORACLE_HOME` al `.env` i reinicia el backend |
| **`ORA-12541`** | No hi ha Listener Oracle | Revisa que el port i el host de base de dades siguin correctes |
| **`ORA-01017`** | Usuari/contrasenya invàlids | Comprova i torna a escriure les credencials al formulari |
| **`ORA-12514`** | SID/Service Name no trobat | Verifica amb el DBA el SID correcte de la instància |
| **`Connection refused`** | Tallafocs o port tancat | Verifica la connectivitat TCP des de la màquina local |

