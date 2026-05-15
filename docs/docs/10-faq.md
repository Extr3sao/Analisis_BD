---
sidebar_position: 10
sidebar_label: 'Preguntes freqüents'
---

# Preguntes Freqüents (FAQ)

## Connexió i configuració

### ❓ El selector de connexió apareix buit. Què he de fer?

El missatge `Sense perfils disponibles` significa que no hi ha cap connexió Oracle configurada.

**Solució**: Ves a la pestanya **Configuració** → `+ Nova connexió` i crea un perfil amb les dades de la teva instància Oracle.

---

### ❓ El backend no arrenca / la pàgina no carrega

**Causes possibles**:
1. El servidor FastAPI no està en execució
2. El port 8000 ja el fa servir una altra aplicació
3. Error d'importació en algun mòdul Python

**Solució**:
- Executa `run.ps1` o `python main.py` des de la carpeta arrel del projecte
- Comprova els logs a `backend_start.log` per a detalls de l'error
- Si el port 8000 és ocupat, para el procés que l'usa: `netstat -ano | findstr :8000`

---

### ❓ Error `DPI-1047` en intentar connectar amb Oracle

L'Oracle Instant Client no s'ha trobat al sistema.

**Solució**:
1. Instal·la l'Oracle Instant Client (versió compatible amb la teva BD)
2. Configura la variable d'entorn al fitxer `.env`:
   ```env
   ORACLE_HOME=C:\oracle\instantclient
   ```
3. Reinicia el backend

---

### ❓ Error `ORA-01017`: Invalid username/password

Les credencials de la connexió Oracle no són correctes.

**Solució**: Edita la connexió a Configuració i verifica usuari i contrasenya. Recorda que Oracle és sensible a majúscules/minúscules en les contrasenyes.

---

## Auditoria i execució

### ❓ El botó "Executar" apareix deshabilitat

El botó s'habilita quan es compleixen **totes** les condicions:
- ✅ Hi ha un perfil Oracle seleccionat
- ✅ Hi ha almenys un check seleccionat
- ✅ No hi ha cap execució en curs

---

### ❓ La llista de checks apareix buida o no es carrega

**Causes possibles**:
- El fitxer `auditoria_post_crq.md` no existeix a la ruta arrel del projecte
- El backend no pot llegir el fitxer per permisos o ruta incorrecta

**Solució**: Comprova que el fitxer existeix i prem **Sinc. Checks** per forçar la recàrrega.

---

### ❓ El CHECK_11 triga molt a executar-se

El CHECK_11 executa una consulta de proximitat heurística sobre `dba_source` (el codi font de tots els objectes PL/SQL modificats recentment). Si l'esquema auditado conté molts objectes (paquets, procedures, funcions, triggers), la query pot ser costosa.

**Consell**: Especifica uns **esquemes concrets** al camp `Esquemes opcionals` per limitar el perímetre de la query i reduir el temps d'execució.

---

### ❓ Error: "No s'ha pogut carregar la documentació"

El botó **"Veure documentació tècnica"** (a la vista d'auditoria) no ha pogut accedir a l'endpoint `/api/docs/technical-audit`.

**Solució**: Verifica que el backend és operatiu i que el fitxer `auditoria_post_crq.md` és accessible.

---

## Descàrrega d'informes

### ❓ "Cal seleccionar un proveïdor abans de generar el report"

Has seleccionat la variant `Un proveïdor` però no has escollit cap proveïdor al segon desplegable.

**Solució**: Selecciona un lot/proveïdor del desplegable que apareix a la dreta del selector de variant.

---

### ❓ "La versió experimental només està disponible per al resum general"

Has intentat generar un informe v2 amb la variant `provider` o `all`. La versió experimental (`v2`) només funciona amb `Resum general`.

**Solució**: Canvia la variant a `Resum general` o usa la versió `v1`.

---

### ❓ El ZIP descarregat apareix buit o corrupte

**Possible causa**: L'auditoria s'ha interromput a meitat o no hi ha resultats per empaquetar.

**Solució**: Executa l'auditoria de nou i espera que finalitzi correctament.

---

## Automatitzacions

### ❓ Un job no s'ha executat a l'hora programada

**Causes possibles**:
- El backend no estava en execució a l'hora programada
- El job no tenia cap lot assignat
- Hi havia un error de connexió Oracle

**Solució**: Consulta l'**Historial d'execucions** a la secció d'Automatitzacions per veure l'error específic. Pots usar el botó **Reintentar** per llençar el job manualment.

---

### ❓ "No hi ha cap connexió configurada" a la vista d'Automatitzacions

L'entorn no té cap connexió Oracle activa.

**Solució**: Crea almenys una connexió a **Configuració** i marca-la com a **Activa**.
