---
'@talend/scripts-yarn-workspace': major
---

Rewrite `workspace-run` to shell out to `pnpm -r run <script> --if-present` instead of parsing `yarn workspaces info` and hand-rolling a topological dependency sort. This package now requires `pnpm` instead of `yarn` to be installed, and no longer runs workspace scripts in dependency order (parallelism/bail behavior is now controlled via pnpm's `--workspace-concurrency`/`--no-bail` flags rather than the old `consume`/`EXECUTE_PARALLEL` sequencing). The now-unused `consume.js` helper is deleted.
