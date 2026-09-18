---
'@talend/react-components': patch
---

Switch internal `build:lib:tsc` script invocation from `yarn run tsc` to `pnpm run tsc` and drop the now-unused `resolutions.minimist` field (pnpm doesn't read `resolutions`; the override is handled at the workspace root instead).
