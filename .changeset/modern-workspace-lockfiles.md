---
'@talend/scripts-utils': patch
---

Limit Babel cache lockfile detection to pnpm-lock.yaml and package-lock.json, preserving parent-directory lookup and cache invalidation when dependencies change.
