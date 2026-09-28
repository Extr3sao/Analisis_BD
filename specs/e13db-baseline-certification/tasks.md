# E13DB baseline certification tasks

- [x] Verify migration branch ancestry, remote refs, and draft PR state. → FR-001, CON-001
- [x] Inspect CI and pin the existing Python direct dependency baseline. → FR-001, FR-002, AC-001, AC-002
- [x] Execute and classify backend, frontend, FastAPI, and mocked smoke validation. → FR-003, AC-003
- [x] Add and execute isolated FastAPI lifecycle evidence. → FR-005, AC-005; verified with `python -m pytest -q tests/test_app_lifecycle.py` (1 passed) and `tests/test_main_runtime.py` (41 passed).
- [x] Run tracked-artifact, secret, and size review. → NFR-001
- [x] Write certification evidence; do not commit or push while lifecycle evidence is incomplete. → FR-004, AC-004
