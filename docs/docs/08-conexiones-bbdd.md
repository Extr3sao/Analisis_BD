---
sidebar_position: 8
sidebar_label: 'Connexions BBDD'
---

# Gestió de connexions a bases de dades

Les connexions a bases de dades permeten que el **Dashboard E13BD** pugui accedir a les instàncies Oracle per executar les queries d'auditoria. Cada connexió es guarda de forma local i persistent a la base de dades interna de l'aplicació.

## On es guarden les connexions

Les connexions es persisten a **`internal.db`**, una base de dades SQLite local gestionada per FastAPI. Cada connexió inclou:
- Identificador únic intern
- Dades de connexió (host, port, SID, usuari)
- Contrasenya **ofuscada** via XOR (mai en text pla)
- Metadades (descripció, estat activa/inactiva, flag SSL)

## Com crear una connexió Oracle

### Pas 1: Obre el formulari

Accedeix a **Configuració** → `+ Nova connexió`

### Pas 2: Omple les dades

Per a una instància Oracle típica:

```
Nom:      Oracle E13BD Producció
Tipus:    Oracle
Host:     192.168.10.50
Port:     1521
BBDD:     E13BD
Usuari:   AUDIT_USER
Contra.:  [contrasenya de l'usuari]
Activa:   ✅
SSL:      □ (sense SSL per defecte en entorns interns)
```

### Pas 3: Prova la connexió

Prem la icona ▶ (Play) a la taula de connexions per verificar que Oracle és accessible:
- ✅ `Connexió establerta correctament` → Perfil llest per usar
- ❌ Error → Revisa host, port, SID i credencials

## Tipus de bases de dades suportades

| Tipus | Codi | Ús |
|-------|------|----|
| **Oracle** | `oracle` | Principal. Usa `python-oracledb` en mode Thick |
| **SQLite** | `sqlite` | Per a proves locals o bases de dades lleugeres |
| **PostgreSQL** | `postgresql` | Suportat com a alternativa |
| **MySQL** | `mysql` | Suportat com a alternativa |

## Mode Thick d'Oracle (python-oracledb)

El Dashboard utilitza la biblioteca **`python-oracledb`** en mode **Thick** per a la connexió Oracle. Aquest mode requereix:

1. **Oracle Instant Client** instal·lat localment
2. La variable d'entorn `ORACLE_HOME` apuntant al directori del client:
   ```env
   ORACLE_HOME=C:\oracle\instantclient
   ```
3. Les DLLs d'Oracle al `PATH` del sistema

> [!IMPORTANT]
> Si l'Oracle Instant Client no es troba, el backend llençarà un error `DPI-1047` en intentar qualsevol connexió Oracle. Cal instal·lar el client i reiniciar el backend.

## Seguretat de les contrasenyes

Les contrasenyes s'emmagatzemen a `internal.db` **ofuscades** (no xifrades) amb un algorisme XOR simple. Això evita que apareguin en text pla si algú obre directament el fitxer SQLite, però **no és xifrat criptogràfic**.

> [!CAUTION]
> No emmagatzemis contrasenyes d'usuaris amb privilegis molt elevats (DBA, SYSDBA). Usa comptes específics d'auditoria amb els mínims privilegis necessaris per executar els checks.

## API d'endpoints de connexions

| Mètode | Ruta | Descripció |
|--------|------|-----------|
| `GET` | `/api/database-connections/` | Llista totes les connexions |
| `POST` | `/api/database-connections/` | Crea una connexió nova |
| `PUT` | `/api/database-connections/{id}` | Actualitza una connexió |
| `DELETE` | `/api/database-connections/{id}` | Elimina una connexió |
| `POST` | `/api/database-connections/{id}/test` | Prova la connexió |

## Resolució de problemes

| Problema | Possible causa | Solució |
|----------|----------------|---------|
| `DPI-1047` | Oracle Instant Client no trobat | Configura `ORACLE_HOME` |
| `ORA-12541` | No hi ha listener Oracle | Verifica el listener a `{host}:{port}` |
| `ORA-01017` | Usuari/contrasenya incorrectes | Revisa les credencials |
| `ORA-12514` | SID incorrecte | Comprova el Service Name o SID |
| `Connection refused` | Host inaccessible | Verifica la xarxa i el firewall |
