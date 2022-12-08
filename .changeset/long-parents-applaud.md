---
'@talend/scripts-core': minor
---

feat: build:lib now accept --tsc option to use typescript to build it.

build:lib detect if the project is a typescript project by looking at the package.json and look for "type" property.

`build:ts:lib` is now deprecated.