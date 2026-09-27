# E13DB repository migration

## Context

The existing `Extr3sao/Analisis_BD` Git repository will retain its history while its working tree is replaced with the current local E13DB source tree.

## Goals

- Preserve the existing `main` history and create a recoverable pre-migration branch.
- Prepare a reviewable `migration/e13db` branch containing E13DB at the repository root.
- Exclude credentials, runtime databases, generated operational history, logs, caches, and oversized artifacts.
- Validate safe backend and frontend checks without contacting production Oracle.

## Non-goals

- Merge into `main`, rewrite history, force-push, or change production Oracle data.

## Requirements

- FR-001: A `backup/pre-e13db-migration` branch MUST point to the pre-migration `main` commit.
- FR-002: The migration MUST occur on `migration/e13db`, with E13DB source at repository root.
- FR-003: The migration MUST retain source code, tests, configuration templates, documentation, and required assets.
- FR-004: The migration MUST add migration documentation and an E13DB README.
- NFR-001: No secret, runtime SQLite database, runtime history, log, cache, Oracle client, or file over GitHub's normal 100 MB limit MAY be committed.
- NFR-002: The prepared branch MUST pass the safe verification set or document a concrete failure.
- CON-001: `main` MUST remain unmodified; no force-push or history rewrite is permitted.

## Acceptance criteria

- AC-001: Backup branch resolves to the original target `main` commit.
- AC-002: The prepared branch contains the E13DB root structure and no legacy-only tree.
- AC-003: Staged files contain no detected credential patterns or prohibited runtime artifacts.
- AC-004: README and `docs/MIGRATION_FROM_ANALISIS_BD.md` describe the migration accurately.
- AC-005: Backend safe tests and frontend build have recorded results without an Oracle production connection.
- AC-006: One normal migration commit is pushed only to `migration/e13db`; `main` is unchanged.
