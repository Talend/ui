---
'@talend/upgrade-deps': major
---

feat: rewrite package as pure ESM

For more information please read https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

breaking change: If you require this package you have to move to pure ESM too.

* chore: Update strip-ansi to latest version (which is pure ESM)
* chore: Update yarn-deduplicate to latest version
