# Restart App Fix

## Goal
Restore app startup so the requested restart on port `8000` succeeds again.

## Tasks
- [x] Reproduce the failure with `python -m uvicorn src.api.main:app --host 127.0.0.1 --port 8000` and capture the exact syntax error in `src/api/post_crq_pipeline.py` -> Verify: traceback points to the malformed `templates` block.
- [x] Compare the broken block with `HEAD` to isolate the minimal structural fix -> Verify: identify the stray tuple strings outside `"CHECK_11"` and `"CHECK_12"`.
- [x] Repair `_summarize_group` so the `templates` dict is syntactically valid and preserves the intended check summaries -> Verify: `python -m py_compile src/api/post_crq_pipeline.py` passes.
- [x] Restart `uvicorn` on `127.0.0.1:8000` in the project root -> Verify: port `8000` is listening again.
- [x] Validate the restarted app with an HTTP request -> Verify: `http://127.0.0.1:8000` returns `200`.

## Done When
- [x] The backend starts cleanly and the application is reachable again on port `8000`.
