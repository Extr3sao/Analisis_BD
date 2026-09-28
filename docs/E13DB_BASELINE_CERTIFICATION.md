# E13DB Baseline Certification

Repository: `Extr3sao/Analisis_BD`
Branch: `migration/e13db`
Migration commit: `b26a587da7cb1d5ccb6ea83a4a7a81525c55ac63`
Certification worktree: uncommitted
Date: 2026-09-28

## Backend

| Metric | Result |
| --- | --- |
| Collected | 251 (baseline full suite) |
| Passed | 251 (baseline full suite) |
| Failed | 0 |
| Skipped | 0 |
| Deselected | 0 |
| Duration | 779.14s |

Command: `python -m pytest -q -p no:cacheprovider`.

Lifecycle certification follow-up: `python -m pytest -q tests/test_app_lifecycle.py` passed (1 passed, 19.37s), and `python -m pytest -q tests/test_main_runtime.py` passed (41 passed, 16.62s) in the clean environment. The lifecycle test mocks only `automation_service.start` and `automation_service.stop`, enters and exits `TestClient`, and verifies `/openapi.json`; it starts no scheduler worker or external client.

The suite uses unit/integration tests with mocked Oracle, SMTP and AI client boundaries. No real Oracle test was run. `src/core/test_connection.py` and `npm run smoke:ui:oracle` were not executed because they can contact a configured Oracle environment.

## Frontend

| Check | Result |
| --- | --- |
| `npm ci` | PASS — 661 packages installed; audit reported 0 vulnerabilities |
| `npm run lint` | PASS — exit 0 |
| `npm test` | PASS — 26 files, 79 tests |
| `npm run build` | PASS — exit 0; build completed in 49.84s |

## Smoke

| Check | Result |
| --- | --- |
| Frontend mocked smoke (`npm run smoke:ui`) | PASS — Vite, Edge, navigation and intercepted API flows completed |
| Oracle mocked | PASS — frontend smoke intercepted API calls; backend tests mock Oracle boundaries |
| FastAPI import/routes | PASS — clean-environment import reported 88 routes without Oracle contact |
| FastAPI startup/shutdown lifecycle | PASS — isolated TestClient lifecycle test passed and asserted scheduler start/stop calls |

## Clean environment

| Check | Result |
| --- | --- |
| New environment | PASS — `.venv-baseline-clean` created without reusing the active Python environment |
| `python -m pip install -r requirements.txt` | PASS — completed with exit code 0 |
| `python -m pip check` | PASS — no broken requirements found |
| Backend component imports | PASS — FastAPI app, `OracleDBManager`, `AutomationStore`, and `AutomationService` imported without Oracle contact |

## Security

- Real secrets committed: 0
- Runtime databases committed: 0
- Private keys committed: 0
- Environment files with secrets: 0
- Files over 10 MB: 0
- Files over 100 MB: 0

Tracked-file review found only templates, test fixtures, code references and documentation references for secret-related terms. No credential value was exposed during the review.

## CI

Workflow: `.github/workflows/ci.yml`.

It runs for pull requests targeting `main` and pushes to `main`, uses no Oracle/SMTP/OpenRouter credentials, and has no `continue-on-error` or `|| true` bypass for required checks. GitHub Actions status must be rechecked after the certification commit.

## External systems

- Oracle PRO contacted: NO
- SMTP real contacted: NO
- OpenRouter real contacted: NO

## Known limitations

- Direct Python dependencies are pinned to the versions installed for this baseline. Transitive dependencies are resolved by pip and are not hash-locked.
- Transitive dependencies are not hash-locked; pip resolution was validated in the clean environment.

## Decision

`BASELINE_STATUS = NOT_CERTIFIED`

`SAFE_TO_MERGE = NO`

All local certification gates pass. The remaining gate is a successful GitHub Actions run for the certification commit itself; the branch remains a draft pull request and must not be merged.
