---
sidebar_position: 2
---

# Accés a l'aplicació

El **Dashboard E13BD** és una aplicació d'ús intern que **no requereix autenticació** per pantalla de login. L'accés es realitza directament per URL i el control de connexió es gestiona a través del selector de perfil de la barra superior.

## Com accedir

1. **Obre el navegador** i navega a la URL de l'aplicació:
   ```
   http://localhost:8000
   ```
2. L'aplicació es carregarà directament al mòdul d'**Auditoria BBDD**.
3. No es demana usuari ni contrasenya per entrar a la interfície web.

## Selector de connexió activa (Topbar)

Un cop dins l'aplicació, el control d'accés a la base de dades es fa mitjançant el **selector de connexió** que apareix a la barra superior dreta:

- **Etiqueta**: `Connexió activa`
- **Tipus**: Desplegable (`<select>`)
- **Contingut**: Llista de perfils de connexió a Oracle configurats prèviament a **Configuració → Connexions BBDD**

> [!IMPORTANT]
> Si el selector apareix buit o mostra `Sense perfils disponibles`, significa que encara no hi ha cap connexió Oracle configurada. Ves a la pestanya **Configuració** i crea un perfil nou.

## Condicions d'accés

| Condició | Resultat |
|----------|----------|
| URL accessible i backend en marxa | L'app es carrega correctament |
| Cap perfil Oracle configurat | El selector de connexió apareix buit; l'auditoria no es pot executar |
| Perfil seleccionat i Oracle accessible | Estat operatiu complet |
| Backend no operatiu | La pàgina no carrega o mostra error de xarxa |

## Prerequisits tècnics

Per tal que l'aplicació funcioni correctament, cal que:

- El backend Python (FastAPI) estigui en execució: `python main.py` o via `run.ps1`
- L'Oracle Instant Client estigui instal·lat i configurat a `ORACLE_HOME`
- Hi hagi almenys una connexió Oracle definida a la pantalla de **Configuració**

> [!NOTE]
> L'aplicació és d'ús intern i corre en local. No hi ha gestió de sessions, tokens d'expiració ni rols d'usuari. Qualsevol persona amb accés a la URL té accés complet.
