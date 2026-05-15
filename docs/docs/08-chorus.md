---
sidebar_position: 8
---

# Chorus — Orquestració d'Agents

**Chorus** és el framework d'orquestració Multi-Agent utilitzat per gestionar el cicle de vida del desenvolupament d'IA (AI-DLC) dins del Dashboard E13BD.

## Què és Chorus?

Chorus actua com un "Agent Harness" (arnès d'agents) que envolta els models de llenguatge (LLM) per coordinar tasques complexes entre diferents perfils d'agents:

- **Architect Agent**: Defineix l'arquitectura i el pla tècnic.
- **Developer Agent**: Implementa el codi basat en el pla.
- **DBA Agent**: Optimitza i audita consultes Oracle.
- **Tester Agent**: Valida la qualitat i seguretat abans del tancament.

## Instal·lació

El framework s'ha instal·lat al directori germà de l'aplicació:
`C:\Users\45485456N\OneDrive - Generalitat de Catalunya\.....Antigravity\Chorus`

### Requisits
- **Node.js**: 18 o superior.
- **Base de dades**: PGlite (embebida) o PostgreSQL.

## Configuració (.env)

El fitxer de configuració d'entorn es troba a la carpeta de Chorus. Els paràmetres principals són:

```env
# URL del servidor
NEXTAUTH_URL="http://localhost:8637"
NEXTAUTH_SECRET="vostre-secret"

# Credencials Super Admin
SUPER_ADMIN_EMAIL="admin@chorus.local"
DEFAULT_USER="dev@chorus.local"
DEFAULT_PASSWORD="chorus123"

# Seguretat
COOKIE_SECURE="false"
```

## Com arrencar Chorus

Per iniciar l'orquestrador en mode desenvolupament:

1. Obre una terminal.
2. Navega al directori de Chorus:
   ```powershell
   cd "C:\Users\45485456N\OneDrive - Generalitat de Catalunya\.....Antigravity\Chorus"
   ```
3. Executa la comanda:
   ```powershell
   npm run dev
   ```
4. Accedeix a la interfície web a: [http://localhost:8637](http://localhost:8637)

## Filosofia "AI-Proposes, Human-Verifies"

Chorus implementa una metodologia de "Conversa Invertida":
1. L'IA analitza el problema i proposa un pla (PRD/Task DAG).
2. L'humà revisa, modifica i aprova el pla.
3. Els agents executen les tasques de manera coordinada.
4. L'humà valida el resultat final.
