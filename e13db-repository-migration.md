# E13DB repository migration

## Goal

Replace the Analisis_BD working tree with E13DB while preserving target Git history.

## Tasks

- [x] Create backup branch from target `main` → Verify: both refs resolve to `5fc1536`.
- [x] Create `migration/e13db` → Verify: target worktree is on that branch.
- [x] Copy classified E13DB source to target root → Verify: source tree and explicit exclusions match.
- [x] Update repository documentation and ignore policy → Verify: staged paths exclude runtime and secrets.
- [x] Validate backend and frontend safely → Verify: backend subset passes; frontend install is environment-blocked.
- [ ] Commit, push branch, and create PR → Verify: remote branch and PR target `main`.

## Done when

- [ ] One normal migration commit is available for review without modifying `main`.
