---
"@talend/scripts-config-babel": minor
---

feat: add preset modules option

if process.env.ESM is set to true then the babel config will set preset-env.modules option to `false` so the output will be esm.
