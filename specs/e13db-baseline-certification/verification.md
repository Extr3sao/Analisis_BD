# Verification evidence

## Environment

Fresh virtual environment: `.venv-baseline-clean` (Python 3.14). It was created separately from the active interpreter. The earlier incomplete `.venv-baseline` was not reused.

## Commands and results

| Command | Result |
| --- | --- |
| `.venv-baseline-clean\\Scripts\\python.exe -m pip install -r requirements.txt` | PASS, exit 0 |
| `.venv-baseline-clean\\Scripts\\python.exe -m pip check` | PASS, no broken requirements |
| Clean-environment imports of FastAPI app, OracleDBManager, AutomationStore, AutomationService | PASS, 88 routes; no Oracle contact |
| `.venv-baseline-clean\\Scripts\\python.exe -m pytest -q tests/test_app_lifecycle.py` | PASS, 1 passed in 19.37s |
| `.venv-baseline-clean\\Scripts\\python.exe -m pytest -q tests/test_main_runtime.py` | PASS, 41 passed in 16.62s |
| Prior baseline `python -m pytest -q -p no:cacheprovider` | PASS, 251 passed in 779.14s |

## Acceptance criteria

| Criterion | Evidence |
| --- | --- |
| AC-001 | CI workflow targets `main` for pull requests and pushes. |
| AC-002 | All direct Python requirements are exact pins. |
| AC-003 | Certification document records PASS, NOT_EXECUTED and full-suite metrics. |
| AC-004 | Certification document identifies branch, migration commit, security and CI requirements. |
| AC-005 | `tests/test_app_lifecycle.py` entered and exited `TestClient`, served OpenAPI, and asserted scheduler start/stop. |

## Residual risk

The certification commit needs its own successful GitHub Actions run before merge authorization.
