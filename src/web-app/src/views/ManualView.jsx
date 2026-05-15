import React, { useState } from 'react';
import { 
  BookOpen, Info, ShieldAlert, Network, Settings, 
  Bot, Wrench, Workflow, Layers, CheckSquare, Wrench as ToolIcon
} from 'lucide-react';
import MermaidDiagram from '../components/MermaidDiagram';

const SECTIONS = [
  { id: 'overview', title: 'Visió general', icon: Info },
  { id: 'audit', title: 'Auditoria BBDD', icon: ShieldAlert },
  { id: 'architecture', title: 'Arquitectura', icon: Network },
  { id: 'config', title: 'Configuració', icon: Settings },
  { id: 'agents', title: 'Agents IA', icon: Bot },
  { id: 'skills', title: 'Skills disponibles', icon: Wrench },
  { id: 'workflow', title: 'Flux complet', icon: Workflow },
  { id: 'distribution', title: 'Distribució de Reports', icon: Layers },
  { id: 'usage', title: "Guia d'ús", icon: CheckSquare },
  { id: 'maintenance', title: 'Manteniment', icon: ToolIcon },
];

export default function ManualView() {
  const [activeSection, setActiveSection] = useState('overview');

  const openDocusaurusManual = () => {
    window.open('/docs/', '_blank');
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Visió general</h2>
                <p className="text-muted-foreground">Benvingut al Manual de l'Aplicació del Dashboard E13BD.</p>
              </div>
              <button 
                onClick={openDocusaurusManual}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg transition-all font-medium text-sm"
              >
                <BookOpen size={16} />
                Obrir Manual Interactiu (Docusaurus)
              </button>
            </div>
            <div className="glass-card p-6 space-y-4">
              <p>
                El <strong>Dashboard E13BD</strong> és una plataforma centralitzada dissenyada per a auditar, gestionar i analitzar entorns de base de dades Oracle (específicament per a l'ecosistema E13BD).
              </p>
              <p>
                Aquest sistema combina una interfície d'usuari moderna (React) amb un potent backend en Python (FastAPI) per executar auditories, generar informes automàtics, i utilitzar capacitats d'Intel·ligència Artificial per analitzar codi (per exemple, detecció del patró N+1).
              </p>
              <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">Objectius principals:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Automatització d'Auditories Post-CRQ per a entorns Oracle.</li>
                  <li>Generació d'informes professionals dinàmics per a la validació de qualitat.</li>
                  <li>Detecció proactiva d'ineficiències en consultes SQL mitjançant IA avançada.</li>
                  <li>Gestió centralitzada de connexions i perfils de bases de dades.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'audit':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Auditoria BBDD (Post-CRQ)</h2>
              <p className="text-muted-foreground">Funcionament del mòdul d'auditories automàtiques.</p>
            </div>
            <div className="glass-card p-6 space-y-4">
              <p>
                L'auditoria Post-CRQ analitza els canvis aplicats a la base de dades en un rang de temps concret. Defineix una sèrie de <strong>Checks (Q01-Q19)</strong> especificats en el fitxer <code>auditoria_post_crq.md</code>.
              </p>
              <h4 className="font-semibold mt-4">Integració IA (CHECK 11)</h4>
              <p>
                El <strong>CHECK 11</strong> s'encarrega de detectar l'anomenat patró N+1 (consultes SQL repetitives dins de bucles). Quan aquest check retorna resultats des d'Oracle, el sistema envia els fragments de codi a una IA via OpenRouter per classificar si és realment una "Mala Praxi" o un "Fals Positiu".
              </p>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Arquitectura de l'Aplicació</h2>
              <p className="text-muted-foreground">Estructura tecnològica de la solució completa.</p>
            </div>
            
            <MermaidDiagram 
              id="architecture"
              chart={`
graph TD
    subgraph Frontend["React (Vite + Tailwind)"]
        UI["Interfície d'Usuari"]
        Views["Vistes (Auditoria, Config, Manual)"]
    end

    subgraph Backend["FastAPI (Python)"]
        API["Rutes i Endpoints (/api)"]
        Orchestrator["post_crq_audit.py"]
        Report["report_builder.py"]
        Distributor["post_crq_delivery_reports.py"]
    end

    subgraph Storage["Emmagatzematge i Serveis"]
        SQLite[("internal.db (SQLite)")]
        Oracle[("Oracle DB (E13BD)")]
        FS["Filesystem (Reports ZIP/PDF)"]
        LLM["OpenRouter (IA)"]
    end

    UI --> Views
    Views -- "Peticions HTTP" --> API
    API --> Orchestrator
    API --> Report
    
    API -- "CRUD Connexions" --> SQLite
    Orchestrator -- "Execució PL/SQL" --> Oracle
    Orchestrator -- "Validació codi (Check 11)" --> LLM
    Report -- "Escriptura de fitxers" --> FS
    Distributor -- "Empaquetat ZIP" --> FS
              `} 
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <h4 className="font-semibold mb-2">Frontend</h4>
                <p className="text-sm">Desenvolupat amb <strong>React 19</strong>, utilitzant <strong>Vite</strong> per al procés de build i <strong>Tailwind CSS</strong> per a l'estilització visual basada en utilitats i disseny <em>glassmorphism</em>.</p>
              </div>
              <div className="glass-card p-4">
                <h4 className="font-semibold mb-2">Backend</h4>
                <p className="text-sm">Desenvolupat amb <strong>FastAPI</strong>. Serveix com a pont cap a la base de dades Oracle (`python-oracledb`) i exposa una API RESTful al frontend.</p>
              </div>
            </div>
          </div>
        );

      case 'config':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Configuració i Entorn</h2>
              <p className="text-muted-foreground">Gestió de connexions i variables d'entorn.</p>
            </div>
            <div className="glass-card p-6 space-y-4">
              <p>
                L'aplicació depèn de variables d'entorn (fitxer <code>.env</code>) per a paràmetres crítics que no s'han d'exposar mai en el codi font.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <p>OPENROUTER_API_KEY=sk-or-v1-****************</p>
                <p>AI_MODEL=meta-llama/llama-3.3-70b-instruct:free</p>
                <p>ORACLE_HOME=C:\oracle\instantclient</p>
              </div>
              <h4 className="font-semibold mt-4">Base de dades interna</h4>
              <p>
                Les configuracions d'aplicació (com les connexions guardades pels usuaris) es mantenen localment en una base de dades SQLite (<code>internal.db</code>). S'empra ofuscació (XOR) per a l'emmagatzematge de contrasenyes per evitar text pla.
              </p>
            </div>
          </div>
        );

      case 'agents':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Agents IA</h2>
              <p className="text-muted-foreground">Rols i entitats automatitzades dins del sistema i entorn de desenvolupament.</p>
            </div>
            
            <div className="grid gap-4">
              <div className="glass-card border-l-4 border-l-primary p-4">
                <h4 className="font-bold flex items-center gap-2"><Bot size={18} /> Agents de Desenvolupament (Antigravity)</h4>
                <p className="text-sm mt-2 text-muted-foreground">Agents utilitzats per a la construcció de l'aplicació.</p>
                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                  <li><strong>orchestrator-e13bd</strong>: Agent product manager que organitza els plans i les tasques.</li>
                  <li><strong>architect-e13bd</strong>: Defineix l'arquitectura i estructures de codi abans de la implementació.</li>
                  <li><strong>developer-e13bd</strong>: Desenvolupa i escriu el codi de la solució final.</li>
                  <li><strong>tester-e13bd</strong>: Responsable de QA i assegurar que no hi ha regressions.</li>
                  <li><strong>dba-e13bd</strong>: Expert en optimització i auditories de bases de dades Oracle.</li>
                </ul>
              </div>

              <div className="glass-card border-l-4 border-l-blue-500 p-4">
                <h4 className="font-bold flex items-center gap-2"><Bot size={18} /> Agents d'Execució (Runtime)</h4>
                <p className="text-sm mt-2 text-muted-foreground">Agents integrats dins del codi Python de l'aplicació.</p>
                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                  <li><strong>AI Auditor Agent</strong> (<code>post_crq_check11_ai.py</code>): Transforma alertes tècniques d'Oracle en judicis experts sobre males praxis de codi.</li>
                  <li><strong>Report Design Agent</strong> (<code>report_design_agent.py</code>): Cervell de disseny que genera el JSON de configuració visual pels informes PDF i Markdown.</li>
                  <li><strong>ATIC Reporting Agent</strong>: Responsable final d'aplicar l'estilització corporativa als documents.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Skills (Capacitats)</h2>
              <p className="text-muted-foreground">Mòduls operatius i eines utilitzades pels agents per realitzar accions concretes.</p>
            </div>
            <div className="glass-card p-6">
              <p className="mb-4">
                Una <strong>Skill</strong> representa una capacitat modular del codi que pot ser cridada per executar una tasca d'alta complexitat de manera aïllada.
              </p>
              <div className="space-y-4">
                <div className="p-3 border rounded bg-card/50">
                  <h4 className="font-bold text-sm">Database Skill (<code>db_manager.py</code>)</h4>
                  <p className="text-xs text-muted-foreground mt-1">S'encarrega d'establir la connexió d'alt rendiment amb Oracle (via Thick-mode) i gestionar l'execució i mapeig dels resultats SQL.</p>
                </div>
                <div className="p-3 border rounded bg-card/50">
                  <h4 className="font-bold text-sm">AI Skill (<code>openrouter_client.py</code>)</h4>
                  <p className="text-xs text-muted-foreground mt-1">Facilita la connexió asíncrona amb els proveïdors d'IA via OpenRouter, amb suport per fallbacks, retry logic i prompts estructurats.</p>
                </div>
                <div className="p-3 border rounded bg-card/50">
                  <h4 className="font-bold text-sm">Report Builder Skill (<code>report_builder.py</code>)</h4>
                  <p className="text-xs text-muted-foreground mt-1">Capacitat per compondre documents Markdown o PDF aplicant lògiques de puntuació de negoci (Score E13BD) als conjunts de resultats de l'auditoria.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chorus':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Chorus (Orquestració)</h2>
              <p className="text-muted-foreground">Sistema de coordinació multi-agent.</p>
            </div>
            <div className="glass-card p-6 space-y-4">
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Instal·lació de Chorus Framework</h4>
                <p className="text-sm">
                  S'ha instal·lat el framework <strong>Chorus</strong> oficial com a arnès d'agents per a l'orquestració de l'ecosistema E13BD. 
                  Aquest component actua com el cervell central que coordina els agents especialitzats (Architect, DBA, Developer i Tester) per garantir la traçabilitat de les tasques i la validació humana en cada fase.
                </p>
              </div>
              <p>El flux d'orquestració inclou:</p>
              <ul className="list-disc list-inside space-y-2 text-sm ml-2">
                <li>Recepcionar la comanda de l'usuari.</li>
                <li>Desglossar les tasques per cridar el mòdul de Base de Dades per extreure els registres.</li>
                <li>Condicionar l'entrada del mòdul IA per analitzar els resultats.</li>
                <li>Derivar els resultats consolidats al Report Builder per obtenir un output de negoci formatat.</li>
              </ul>
            </div>
          </div>
        );

      case 'workflow':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Flux complet de funcionament</h2>
              <p className="text-muted-foreground">Com es relacionen tots els components durant una petició d'auditoria.</p>
            </div>
            
            <MermaidDiagram 
              id="workflow"
              chart={`
sequenceDiagram
    participant User as Usuari
    participant Dash as Dashboard (UI)
    participant API as FastAPI Backend
    participant DB as Oracle DB
    participant AI as AI Auditor Agent
    participant Rep as Report Builder
    
    User->>Dash: Prem "Llençar Auditoria"
    Dash->>API: POST /api/audit/post-crq/run
    API->>API: Analitza i orquestra la petició
    API->>DB: Executa Queries Q01-Q19
    DB-->>API: Dades brutes (JSON)
    
    opt Si existeixen defectes al Check 11
        API->>AI: Sol·licita Anàlisi N+1
        AI->>AI: Evalua semàntica del codi
        AI-->>API: Classificació Risc (JSON)
    end
    
    API->>Rep: Genera informe
    API->>API: Orquestra distribució
    API->>API: Genera ZIP i Reports per proveïdor
    Rep-->>API: Report MD/PDF
    API-->>Dash: Resultat Auditoria + Descàrregues
    Dash-->>User: Mostra resultats i permet baixar ZIP
              `} 
            />
          </div>
        );

      case 'distribution':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Distribució de Reports</h2>
              <p className="text-muted-foreground">Mecanisme de generació d'informes segmentats per proveïdor i empaquetat.</p>
            </div>
            <div className="glass-card p-6 space-y-4">
              <p>
                El sistema inclou una capacitat avançada de distribució (<code>post_crq_delivery_reports.py</code>) que permet:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="p-4 bg-primary/5 border rounded-lg">
                  <h4 className="font-semibold text-primary mb-1 text-sm">Report General</h4>
                  <p className="text-xs text-muted-foreground">Un document PDF complet amb totes les troballes de tots els lots per a ús intern.</p>
                </div>
                <div className="p-4 bg-primary/5 border rounded-lg">
                  <h4 className="font-semibold text-primary mb-1 text-sm">Reports per Proveïdor</h4>
                  <p className="text-xs text-muted-foreground">Documents filtrats que només contenen les troballes del lot/proveïdor específic.</p>
                </div>
              </div>
              <h4 className="font-semibold mt-4">Empaquetat ZIP</h4>
              <p className="text-sm">
                Tots els artifacts es consoliden en un únic fitxer ZIP que inclou un <code>manifest.json</code> amb la traçabilitat de l'execució, facilitant el lliurament massiu de resultats d'auditoria.
              </p>
              <div className="p-4 bg-secondary/30 rounded-lg border border-dashed text-xs font-mono">
                Ruta: resources/automation_reports/job_XX_run_YY_timestamp.zip
              </div>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Guia d'ús pas a pas</h2>
              <p className="text-muted-foreground">Instruccions de navegació bàsiques.</p>
            </div>
            <div className="glass-card p-6 space-y-4">
              <ol className="list-decimal list-inside space-y-4 text-sm">
                <li className="p-2 hover:bg-muted/50 rounded transition-colors">
                  <strong>Configurar connexions:</strong> Ves a la pestanya de "Configuració" al menú esquerre. A l'apartat de connexions, crea un perfil per a Oracle amb les credencials correctes. Es guardarà de forma local.
                </li>
                <li className="p-2 hover:bg-muted/50 rounded transition-colors">
                  <strong>Seleccionar Perfil:</strong> Assegura't de seleccionar el perfil actiu al selector de la capçalera (Top Bar).
                </li>
                <li className="p-2 hover:bg-muted/50 rounded transition-colors">
                  <strong>Executar Auditoria:</strong> Obre la pestanya "Auditoria BBDD", ajusta els paràmetres (dies enrere, esquemes) i fes clic a execució. Espera que la barra de progrés finalitzi.
                </li>
                <li className="p-2 hover:bg-muted/50 rounded transition-colors">
                  <strong>Visualitzar Resultats:</strong> Els resultats es mostraran de manera interactiva a les taules. Si configures la pestanya "Resum", hi veuràs els gràfics.
                </li>
              </ol>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Manteniment i Bones Pràctiques</h2>
              <p className="text-muted-foreground">Requisits tècnics i actualitzacions de la plataforma.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass-card p-4 border-t-4 border-t-emerald-500">
                <h4 className="font-semibold mb-2">Build del Frontend</h4>
                <p className="text-sm text-muted-foreground">
                  Després de qualsevol canvi visual a la carpeta <code>src/web-app</code>, has d'executar <code>npm run build</code> per compilar els estils Tailwind i l'app React al directori estàtic que FastAPI exposa.
                </p>
              </div>
              <div className="glass-card p-4 border-t-4 border-t-amber-500">
                <h4 className="font-semibold mb-2">Variables d'Entorn</h4>
                <p className="text-sm text-muted-foreground">
                  Mantén el <code>.env</code> segur fora de control de versions (al repositori només hauria de pujar-se un <code>.env.example</code>). Mai hi facis commits de credencials.
                </p>
              </div>
              <div className="glass-card p-4 border-t-4 border-t-blue-500">
                <h4 className="font-semibold mb-2">Instal·lació de Dependències</h4>
                <p className="text-sm text-muted-foreground">
                  Les dependències Python han de trobar-se al <code>requirements.txt</code> i les de Frontend a <code>package.json</code>. Utilitza un <code>.venv</code> pur per Python.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Sidebar de Navegació del Manual */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-background/50 border-r border-border md:h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-4">
          <h3 className="font-bold uppercase text-xs tracking-wider text-muted-foreground mb-4">Índex del Manual</h3>
          <nav className="space-y-1">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'} />
                  <span className="truncate">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Contingut del Manual */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background/30 pb-20">
        <div className="max-w-4xl mx-auto">
          {renderSectionContent()}
        </div>
      </main>
    </div>
  );
}
