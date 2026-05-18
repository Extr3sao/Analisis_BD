# Post-CRQ PDF Time Window Fix

## Goal
Make the Post-CRQ PDF preserve the exact selected hours for custom date ranges and render them in `dd/MM/yyyy HH:mm`.

## Tasks
- [ ] Update the shared time-window formatter in `src/api/post_crq_audit.py` so range mode uses `range_start_at` / `range_end_at` when available.
- [ ] Add PDF logging and keep the report-model parameter row in sync with the same human-readable window format.
- [ ] Extend regression coverage to assert the PDF cover shows the exact selected hours and not `00:00h` / `23:59h`.

## Done When
- [ ] A range such as `2026-04-07 17:30 -> 2026-04-08 17:30` renders in the PDF exactly as `07/04/2026 17:30 - 08/04/2026 17:30`.
- [ ] Tests fail if the PDF falls back to day boundaries again.
