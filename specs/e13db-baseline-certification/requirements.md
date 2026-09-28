# E13DB baseline certification requirements

## Goal

Certify the migrated E13DB branch as a safe, reproducible baseline without adding product functionality.

## Requirements

- FR-001: CI MUST validate pull requests targeting `main` and pushes to `main` without Oracle PRO.
- FR-002: Python direct dependencies MUST be version-pinned to the certified baseline.
- FR-003: Backend mocked tests, frontend lockfile installation, lint, tests, build, and mocked smoke MUST have recorded outcomes.
- FR-004: The repository MUST contain a baseline certification document with truthful results and known limitations.
- FR-005: The FastAPI lifespan MUST be covered by an isolated automated smoke test that proves startup, an available route, and shutdown without contacting external services.
- NFR-001: No real secret, sensitive runtime artifact, or tracked file over 100 MB MAY be present.
- CON-001: The PR remains draft; `main` is never merged or force-pushed during certification.

## Acceptance criteria

- AC-001: CI trigger configuration explicitly targets `main` for push and pull request events.
- AC-002: `requirements.txt` contains exact versions for all direct dependencies.
- AC-003: Certification results distinguish passed, failed, skipped, deselected, and not-run checks.
- AC-004: `docs/E13DB_BASELINE_CERTIFICATION.md` records branch, commits, security review, CI status, and external-system non-contact.
- AC-005: A focused FastAPI lifecycle test enters and exits `TestClient`, receives a successful response from a local route, and asserts one scheduler start and stop call.
