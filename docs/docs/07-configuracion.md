---
sidebar_position: 7
---

# Configuració — Connexions BBDD

La pantalla de **Configuració** permet gestionar els perfils de connexió a bases de dades que l'aplicació utilitza per executar auditories. Cada perfil representa un accés a una base de dades Oracle (o compatible).

## Vista de la pantalla

La pantalla mostra:
- **Títol**: `Connexions a BBDD` (amb icona de base de dades)
- **Descripció**: "Gestiona les credencials i rutes d'accés a les bases de dades per a l'auditoria."
- **Botó principal**: `+ Nova connexió` (cantonada superior dreta)
- **Taula de connexions**: Llista de totes les connexions guardades

### Columnes de la taula de connexions

| Columna | Descripció |
|---------|-----------|
| **Nom de la connexió** | Identificador llegible + descripció opcional |
| **Tipus** | Tipus de BBDD (ORACLE, SQLITE, etc.) |
| **Servidor** | Host i port (ex: `192.168.1.100:1521`) |
| **Base de dades** | SID o Service Name |
| **Usuari** | Nom d'usuari de connexió |
| **Estat** | `Activa` (verd) o `Inactiva` (gris) |
| **Accions** | Botons de provar, editar i eliminar |

### Estat buit

Si no hi ha connexions configurades, la taula mostra el missatge:
> `No hi ha cap connexió configurada.`

## Formulari de connexió

S'obre en un **modal** al centre de la pantalla en prémer `+ Nova connexió` o l'acció d'editar.

### Camps del formulari

| Camp | Tipus | Obligatori | Exemple | Notes |
|------|-------|-----------|---------|-------|
| **Nom de la connexió** | Text | ✅ Sí | `Oracle Producció` | Nom descriptiu per identificar el perfil |
| **Tipus** | Desplegable | ✅ Sí | `Oracle` | Opcions: Oracle, SQLite, PostgreSQL, MySQL |
| **Servidor (Host)** | Text | ✅ Sí | `192.168.1.100` o `localhost` | Adreça IP o hostname |
| **Port** | Text | No | `1521` | Port de connexió (default Oracle: 1521) |
| **Base de dades (SID)** | Text | ✅ Sí | `ORCL` | SID o Service Name d'Oracle |
| **Usuari** | Text | No | `audit_user` | Usuari de la base de dades |
| **Contrasenya** | Password | No | `*****` | En edició: deixar en blanc per no canviar |
| **Descripció** | Textarea | No | `BD de producció E13BD` | Notes addicionals |
| **Activa** | Checkbox | — | ✅ | Si està inactiva, no apareix al selector |
| **Utilitzar SSL** | Checkbox | — | — | Activa connexió xifrada |

> [!IMPORTANT]
> Les contrasenyes s'emmagatzemen **ofuscades** a la base de dades interna (`internal.db`) mitjançant XOR. Mai es guarden en text pla.

### Botons del formulari

| Botó | Acció |
|------|-------|
| **Guardar** | Desa la connexió (POST si és nova, PUT si s'edita) |
| **Cancel·lar** | Tanca el modal sense guardar |
| ✕ (X) | Tanca el modal |

## Accions sobre connexions existents

| Acció | Icona | Comportament |
|-------|-------|-------------|
| **Provar** | ▶ Play | Executa un test de connexió en temps real (`POST /api/database-connections/{id}/test`) |
| **Editar** | ✏️ Edit | Obre el modal amb les dades actuals de la connexió |
| **Eliminar** | 🗑️ Trash | Demana confirmació i elimina permanentment la connexió |

## Missatges del sistema

| Situació | Missatge |
|----------|---------|
| Connexió guardada | `Connexió guardada correctament` (fons verd) |
| Test de connexió OK | `Connexió establerta correctament: [detall]` (fons verd) |
| Error al desar | `No s'ha pogut guardar la connexió` (fons vermell) |
| Error al provar | `Error al provar la connexió` (fons vermell) |
| Error al eliminar | `No s'ha pogut eliminar la connexió` (fons vermell) |
| Error al carregar | `No s'han pogut carregar les connexions` (fons vermell) |

## Recuperació de connexions llegades

L'aplicació inclou la capacitat de llegir i importar perfils de connexió des del fitxer de configuració tradicional `config/Cadena_conexions.txt`. Aquestes connexions s'integren automàticament a la base de dades interna per permetre la seva gestió visual i el xifrat segur de credencials.

> [!TIP]
> Si teniu connexions definides al fitxer de text que no apareixen a la taula, assegureu-vos que el format és `## NOM`, `USER`, `PASSWORD` i `DSN`.

## Variables d'entorn relacionades

L'aplicació utilitza el fitxer `.env` per a paràmetres del motor Oracle:

```env
OPENROUTER_API_KEY=sk-or-v1-****************
AI_MODEL=meta-llama/llama-3.3-70b-instruct:free
ORACLE_HOME=C:\oracle\instantclient
```

> [!NOTE]
> `ORACLE_HOME` apunta al directori de l'**Oracle Instant Client** instal·lat localment. Sense aquest directori, la connexió Oracle en mode Thick no funciona.
