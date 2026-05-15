# Prompt Generat - Explicacio Score Deep Scan (v4)

## CO-STAR
- Context: Auditoria Oracle de l'aplicacio, amb score d'obsolescencia calculat per factors de risc i inactivitat.
- Objectiu: Explicar de forma entenedora les puntuacions i justificar per que un esquema arriba a 100.
- Estil: Tecnic, clar, orientat a evidencies.
- To: Professional i directe.
- Audiencia: Equip DBA/arquitectura i product owner tecnic.
- Resposta: Taula de factors + suma + conclusio operativa.

## A.F.I.N.E.
- Analisi: Descompondre cada factor i els punts assignats.
- Format: Llista numerada + taula final.
- Instruccio: No inventar dades; usar `score_breakdown` i `summary`.
- Narrativa: De dades a decisio (`NO ELIMINAR`, `PRECAUCIO`, `ELIMINAR`).
- Estructura: 1) Factors 2) Suma 3) Clamp [0,100] 4) Recomanacio.

## Prompt operatiu
"""
Explica el resultat de score d'obsolescencia (v4) per a l'esquema {SCHEMA_NAME}.

Dades d'entrada:
- summary: {SUMMARY_JSON}
- score_breakdown: {BREAKDOWN_JSON}
- score_final: {SCORE}
- audit_result: {DECISION}

Instruccions:
1) Mostra cada factor amb punts i justificacio.
2) Calcula i mostra la suma abans de limitar.
3) Explica que el score final sempre es limita entre 0 i 100.
4) Si el score es 100, justifica quins factors han sumat el maxim (cas tipic: 25+30+10+20+15).
5) Tanca amb una recomanacio tecnica accionable.

Format de sortida:
- Resum (2-3 frases)
- Taula: Factor | Punts | Evidencia
- Seccio: "Per que surt {SCORE}%"
- Seccio: "Accio recomanada"
"""
