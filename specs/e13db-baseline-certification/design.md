# Baseline certification design

The certification changes only repository controls: pinned Python direct dependencies, CI trigger scoping, and evidence documentation. The existing frontend lockfile remains the authoritative Node resolution artifact. CI uses mocked/local test paths and does not supply Oracle, SMTP, or OpenRouter credentials.

Certification is only granted when every mandatory validation has direct evidence. A blocked local command or an in-progress CI run remains a blocker rather than being converted into a pass.

## FastAPI lifecycle evidence

`tests/test_app_lifecycle.py` uses `TestClient` against the existing application. It replaces only the global automation scheduler's `start` and `stop` methods during the test. This keeps the production lifespan contract intact while proving it invokes both boundaries, serves a local documentation route, and exits cleanly. No Oracle, SMTP, AI, or scheduler worker is started.
