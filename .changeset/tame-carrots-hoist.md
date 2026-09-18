---
'@talend/icons': patch
---

Keep Node.js builtins external in the Rollup/Vite library build so `src/extract.ts`, a Node-only helper used by the package entry, isn't rewritten to browser shims.
