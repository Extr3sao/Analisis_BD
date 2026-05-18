# CHECK11 CHECK12 Alignment

## Goal
Restore a consistent mapping so `CHECK_11` is the code-problems query and `CHECK_12` is the bulk-collect candidate query with AI-only metadata.

## Tasks
- [x] Reproduce the mismatch by comparing `Auditoria_post_crq.md` with backend mappings and report rendering -> Verify: identify reversed summaries/guidance and misplaced AI references.
- [x] Fix backend text/mapping so summaries and guidance match the real SQL definitions of `CHECK_11` and `CHECK_12` -> Verify: code references show `CHECK_11` = code problems and `CHECK_12` = fila-a-fila/bulk candidates.
- [x] Restrict AI-facing labels and columns to `CHECK_12` only -> Verify: frontend/detail rendering filters IA columns for any other check.
- [x] Run targeted verification for the changed post-CRQ area -> Verify: relevant tests pass.

## Done When
- [x] The UI and generated report no longer imply IA on `CHECK_11`, and `CHECK_12` remains the only AI-enriched check.
