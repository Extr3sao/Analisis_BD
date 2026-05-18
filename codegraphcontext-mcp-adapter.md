# CodeGraphContext MCP Wrapper

## Goal
Hacer que Codex pueda usar `CodeGraphContext` mediante un wrapper MCP oficial compatible con el transporte stdio que usa Codex.

## Tasks
- [x] Crear un wrapper local con la librería oficial `mcp` que exponga las tools reales de `CodeGraphContext` -> Verify: el wrapper responde a `initialize` y `tools/list`.
- [x] Actualizar `C:\Users\45485456N\.codex\config.toml` para arrancar `CodeGraphContext` mediante el wrapper oficial -> Verify: `codex mcp get CodeGraphContext` muestra el nuevo comando.
- [x] Verificar desde una sesión nueva de Codex -> Verify: `CodeGraphContext.list_indexed_repositories({})` responde correctamente.

## Done When
- [x] Una sesión nueva de Codex puede invocar herramientas reales de `CodeGraphContext`.
