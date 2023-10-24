---
'@talend/module-to-cdn': minor
---
remove babel config: there is no build task on this package
remove link to scripts-core to run lint (circular dependency),
remove link to tools/eslint-config and add it's own eslint config (circular dependency: fork/module-to-cdn > tools/eslint-config > tools/scripts-config-cdn > fork/module-to-cdn)
add missing deps
