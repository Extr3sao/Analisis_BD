# E13DB repository migration tasks

- [x] Establish source/target, fetch target, and create backup branch. → FR-001, AC-001
- [x] Create an isolated `migration/e13db` working branch. → FR-002
- [x] Replace target tree with classified E13DB source and update ignore rules. → FR-002, FR-003, NFR-001, AC-002
- [x] Add accurate README and migration record. → FR-004, AC-004
- [x] Run staged-artifact and secret reviews. → NFR-001, AC-003
- [x] Run safe backend/frontend verification and record evidence. → NFR-002, AC-005 (frontend install remains environment-blocked)
- [ ] Create normal migration commit, push only migration branch, and open PR. → CON-001, AC-006
