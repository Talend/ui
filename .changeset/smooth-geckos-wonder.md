---
'@talend/scripts-config-jest': minor
---

feat: transpile node_modules

Since d3 7.x and its dependencies use es6 as main entry in package.json, we need this because jest support of [ECMAPScriptModules](https://github.com/facebook/jest/blob/64de4d7361367fd711a231d25c37f3be89564264/docs/ECMAScriptModules.md) is experiemental