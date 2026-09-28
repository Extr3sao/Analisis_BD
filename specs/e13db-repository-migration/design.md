# Migration design

## Source and target

- Source: local E13DB working tree at `Dashboard E13BD - còpia`.
- Target: clone of `Extr3sao/Analisis_BD`, initially at `main` commit `5fc1536`.

## Migration mechanics

The target clone owns Git history. A backup branch is created from its initial `main`, then `migration/e13db` replaces tracked content. Source content is copied from tracked plus non-ignored files, with an explicit deny-list for generated runtime data and partial downloads. `.git` is never copied or removed.

## Security

The target `.gitignore` must exclude environments, credential files, keys, runtime databases, logs, generated reports/exports, caches, frontend build artifacts, and test artifacts. Staging is explicit rather than `git add .`; a second secret scan is required before commit.

## Validation

Use mocked/temporary SQLite backend tests only; do not invoke Oracle smoke tests. Run the frontend dependency install from its lockfile, test suite when it finishes in the bounded environment, and production build. Record any timeout or failure in verification evidence.

## Failure handling

If validation or secret review fails, do not commit or push unsafe content. Preserve the migration branch for review; `main` and the backup branch remain intact.
