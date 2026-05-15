---
sidebar_position: 3
---

# Pantalla principal — Auditoria BBDD

En accedir a l'aplicació, la primera pantalla visible és el mòdul de **Control de qualitat post-CRQ**. Aquesta és la pantalla principal i el punt de partida de totes les auditories.

## Zones de la pantalla

### Zona 1 — Capçalera i identificació

A la part superior de la pantalla es mostren les metadades de la sessió d'auditoria:

- **Etiqueta de mòdul**: `Auditoria de canvis` (indicador visual en blau)
- **Títol**: `Control de qualitat post-CRQ`
- **Botó d'ajuda** (icona `ⓘ`): Obre un modal amb la guia de funcionament de la pàgina
- **Indicadors en píndola** (informació contextual):
  - `BBDD activa`: Mostra el perfil Oracle seleccionat
  - `Font checks`: Fitxer Markdown des d'on s'han carregat els checks (ex: `auditoria_post_crq.md`)
  - `Checks disponibles`: Total de checks carregats de la font
  - `Seleccionats`: Nombre de checks marcats per executar

### Zona 2 — Controls d'execució

Grup de controls a la part superior dreta:

| Control | Tipus | Funció |
|---------|-------|--------|
| **Base de dades** | Desplegable | Selecciona el perfil Oracle actiu |
| **Esquemes opcionals** | Text (monospace) | Filtra l'auditoria per esquemes específics (ex: `APP_USER, CORE_DB`) |
| **Variant d'informe** | Desplegable | Tria el tipus de report a generar: `Resum general`, `Un proveïdor`, `Tots (ZIP)` |
| **Sinc. Checks** | Botó blau | Sincronitza la llista de checks des del Markdown font |
| **Executar** | Botó primari | Llença l'auditoria amb els checks seleccionats |
| **Descarregar** | Botó índigo | Genera i baixa el report en el format seleccionat |

### Zona 3 — Selecció de checks

Llista de tots els checks disponibles (Q01–Q19) amb:
- **Casella de selecció** individual per cada check
- **Identificador** (ex: `CHECK_01`)
- **Títol** descriptiu del check
- **Criticitat** (Crític / Mitjà / Baix), amb codificació de color:
  - 🔴 **Crític** → fons vermell intens
  - 🟠 **Mitjà** → fons taronja
  - 🔵 **Baix** → fons blau clar
- Botons globals: **Seleccionar tots** / **Netejar selecció**

### Zona 4 — Resultats d'auditoria

Apareix un cop s'ha executat una auditoria. Conté:

- **KPIs de troballes**: Comptadors de troballes crítiques, mitjanes i baixes
- **Resum d'execució**: Durada total, checks executats, errors de connexió
- **Taules de lots**: Resultats agrupats per lot/proveïdor amb accions i terminis
- **Detall tècnic**: Taula expandible per check amb les files d'Oracle

---

> [!TIP]
> Pots executar l'auditoria sense seleccionar esquemes. En aquest cas, Oracle retornarà tots els objectes visibles per a l'usuari de connexió configurat.

> [!NOTE]
> El botó **Sinc. Checks** recarrega la llista des del fitxer Markdown cada vegada que s'actualitza el document font. Cal fer-ho quan s'afegeix un check nou.
