# Post-CRQ Document Editor

## Goal
Integrate a contextual Markdown viewer/editor for the two operational Post-CRQ documents inside the existing audit flow, with manual save, preview, refresh and conflict-safe persistence.

## Tasks
- [x] Audit the current Post-CRQ frontend view and reuse points -> Verify: identify the concrete integration component and existing Markdown/document patterns.
- [ ] Add backend read/save endpoints for Post-CRQ operational documents -> Verify: API returns content plus version metadata and rejects stale saves.
- [ ] Add frontend API helpers and state hook for document loading/editing -> Verify: hook can load both documents, track dirty state and save one document.
- [ ] Integrate the editor into `PostCrqAuditView` with tabs and preview -> Verify: user can switch docs, edit, preview, save and refresh from the CRQ audit screen.
- [ ] Wire contextual refresh triggers to Post-CRQ flow changes -> Verify: documents reload on relevant refresh events without losing unsaved edits silently.
- [ ] Run focused tests for touched frontend/backend paths -> Verify: relevant test suite passes.

## Done When
- [ ] The Post-CRQ audit screen exposes an `Auditoría / Checks` document area with both Markdown files editable and previewable.
- [ ] Saving persists to disk through the API and surfaces clear success/error/conflict states.
