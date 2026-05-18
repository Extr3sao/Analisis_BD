# codex-sql-compare

## Goal
Añadir ejecución, comparación y análisis IA de resultados SQL dentro del Codex Transformation Engine sin romper la gestión actual de checks.

## Tasks
- [ ] Mapear el bloque actual del playground y aislar su estado/UI objetivo -> Verify: identificar el componente y los hooks reutilizables.
- [ ] Diseñar contratos backend para ejecutar izquierda/derecha, comparar y analizar IA -> Verify: payloads y respuestas definidos contra utilidades existentes.
- [ ] Implementar utilidades backend de ejecución y comparación normalizada -> Verify: tests unitarios cubren metadatos, cardinalidad, contenido y orden.
- [ ] Exponer endpoints FastAPI para ejecutar, comparar y analizar diferencias -> Verify: tests API pasan con casos OK/error.
- [ ] Extender la UI del playground con controles, paneles de resultados y bloque comparativo -> Verify: tests frontend cubren acciones principales y render de estados.
- [ ] Verificar extremo a extremo con pruebas relevantes y build -> Verify: pytest objetivo y tests/build frontend en verde.

## Done When
- [ ] La pantalla permite ejecutar ambas consultas, ver resultados, compararlos y pedir análisis IA con feedback claro.
