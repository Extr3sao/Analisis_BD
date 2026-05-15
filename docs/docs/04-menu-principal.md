---
sidebar_position: 4
sidebar_label: 'Menú Principal'
---

# Navegació per l'aplicació

El **Dashboard E13BD** organitza totes les seves funcionalitats en una barra de navegació superior (`top-nav`) amb **4 pestanyes principals** i una barra de capçalera (`topbar`) amb el selector de connexió activa.

## Estructura de la interfície

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo Educació]  Oracle Audit  Portal d'aplicacions intern  │  ← Topbar
│                              [ Connexió activa ▼ ]          │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ Auditoria    │ Arquitectura │ Configuració │ Manual de      │  ← Top-nav
│ BBDD         │              │              │ l'aplicació    │
├──────────────┴──────────────┴──────────────┴────────────────┤
│                                                             │
│                   CONTINGUT PRINCIPAL                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Pestanyes de navegació

### 🛡️ Auditoria BBDD

**Icona**: `ShieldAlert`

El mòdul principal de l'aplicació. Permet executar checks de control de qualitat post-CRQ contra una base de dades Oracle connectada.

**Contingut**: Formulari de configuració d'auditoria, llista de checks, botons d'execució i visualització de resultats.

→ Veure: [Auditoria BBDD](./05-auditoria-bbdd.md)

---

### 🌐 Arquitectura

**Icona**: `Network`

Vista informativa que mostra l'arquitectura tècnica del sistema: diagrama de components, tecnologies emprades i fluxos de dades.

**Contingut**: Diagrames Mermaid interactius, targetes de components frontend/backend/IA.

---

### ⚙️ Configuració

**Icona**: `Settings`

Permet gestionar les connexions a bases de dades que l'aplicació utilitza per executar les auditories.

**Contingut**: Taula de connexions guardades amb accions CRUD (crear, editar, provar, eliminar).

→ Veure: [Configuració de Connexions](./07-configuracion.md)

---

### 📖 Manual de l'aplicació

**Icona**: `BookOpen`

Manual intern integrat a la mateixa interfície, amb navegació lateral per seccions: visió general, arquitectura, agents IA, skills, flux complet, distribució d'informes i guia d'ús.

Inclou un botó **"Obrir Manual Interactiu (Docusaurus)"** que obre aquest document que estàs llegint en una nova pestanya del navegador (`/docs/`).

---

## Topbar — Selector de connexió activa

A la barra superior dreta apareix el **selector de connexió** quan hi ha almenys un perfil configurat:

- **Etiqueta**: `Connexió activa`
- **Control**: Desplegable amb tots els perfils creats a Configuració
- **Efecte**: Canvia el perfil Oracle que usarà la propera execució d'auditoria

> [!IMPORTANT]
> El selector de connexió és **global** per a tota la sessió. Canviar-lo afecta qualsevol operació que requereixi connexió a Oracle.

## Branding

La capçalera mostra el logo institucional del **Departament d'Educació** en dues variants (clar/fosc) i el títol `Oracle Audit` com a identificador de l'aplicació.
