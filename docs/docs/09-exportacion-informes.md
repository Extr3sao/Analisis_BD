---
sidebar_position: 9
sidebar_label: "Exportació d'informes"
---

# Exportació i descàrrega d'informes

El **Dashboard E13BD** ofereix un sistema de descàrrega d'informes integrat que permet obtenir els resultats de l'auditoria en formats PDF i ZIP, segmentats per audiència (general o per proveïdor).

## Variants d'informe disponibles

El sistema ofereix **3 variants** de descàrrega, seleccionables des del desplegable de controls d'execució:

### 1. Resum general (`general`)

- **Descripció**: Un únic document PDF amb totes les troballes agrupades globalment
- **Contingut**: Resum executiu, KPIs, tots els lots i detall tècnic complet
- **Botó**: `Descarregar resum`
- **Nom del fitxer**: `report_post_crq_{perfil}.pdf`
- **Ús típic**: Per a equips interns que necessiten una visió completa de l'auditoria

### 2. Un proveïdor (`provider`)

- **Descripció**: PDF filtrat que només conté les troballes del lot/proveïdor seleccionat
- **Contingut**: Resum executiu + detall específic del lot escollit
- **Control addicional**: Apareix un segon desplegable per seleccionar el proveïdor
- **Botó**: `Descarregar proveïdor`
- **Nom del fitxer**: `report_post_crq_{perfil}.pdf`
- **Prerequisit**: Cal haver executat l'auditoria prèviament per detectar els lots disponibles

> [!NOTE]
> Si el desplegable de proveïdors mostra `Executeu l'auditoria per detectar lots`, significa que no hi ha resultats carregats a memòria. Primer cal prémer **Executar**.

### 3. Tots els proveïdors en ZIP (`all`)

- **Descripció**: Empaqueta en un únic fitxer ZIP el resum general + un PDF individual per cada lot detectat
- **Contingut del ZIP**:
  - `report_general.pdf` → Informe complet
  - `report_lot_{codi_lot}.pdf` → Un PDF per cada proveïdor/lot
  - `manifest.json` → Metadades de traçabilitat de l'execució
- **Botó**: `Descarregar ZIP` (icona d'arxiu)
- **Nom del fitxer**: `auditoria_lots_{perfil}.zip`
- **Ruta de servidor**: `resources/automation_reports/job_XX_run_YY_timestamp.zip`

## El fitxer `manifest.json`

El ZIP inclou un `manifest.json` amb la traçabilitat completa de l'execució:

```json
{
  "generated_at": "2026-01-20T10:35:00Z",
  "profile": "Oracle_E13BD_Pro",
  "checks_executed": ["CHECK_01", "CHECK_02", "CHECK_11"],
  "lots": ["LOT_001", "LOT_002"],
  "total_findings": {
    "CRITIC": 3,
    "MITJA": 7,
    "BAIX": 12
  }
}
```

## Versions d'informe (v1 / v2)

El sistema suporta dues versions de format de resum:

| Versió | Descripció | Disponibilitat |
|--------|-----------|----------------|
| **v1** | Format estàndard de resum | Totes les variants |
| **v2** | Format experimental amb disseny ampliat | Només variant `general` |

> [!WARNING]
> La versió v2 és experimental. Si s'intenta generar en mode `provider` o `all`, el sistema mostrarà: `La versió experimental només està disponible per al resum general.`

## Estats dels botons de descàrrega

| Condició | Botó Descarregar |
|----------|-----------------|
| Cap perfil seleccionat | Desactivat (opac) |
| Cap check seleccionat | Desactivat (opac) |
| Variant `provider` sense lots carregats | Desactivat (opac) |
| Descàrrega en curs | Mostra spinner `↻` |
| Llest | Actiu (blau índigo) |

## Caché de descàrregues

El sistema implementa una **caché de descàrregues** per sessió: si es demana el mateix report dues vegades consecutives (mateixa variant + perfil + timestamp d'execució), el sistema reutilitza el blob ja baixat sense tornar a cridar el backend. Això redueix el temps d'espera en descàrregues repetides.

## API de generació d'informes

| Mètode | Ruta | Descripció |
|--------|------|-----------|
| `POST` | `/api/audit/post-crq/report` | Genera i retorna el PDF/ZIP sol·licitat |

**Paràmetres de la petició**:
- `variant`: `general` \| `provider` \| `all`
- `summary_version`: `v1` \| `v2`
- `provider_code`: Codi del lot (només si `variant = provider`)
- `profile`: Nom del perfil Oracle actiu
- `schemas`: Llista d'esquemes filtrats
- `selected_checks`: Llista de checks seleccionats
