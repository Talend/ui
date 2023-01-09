---
'@talend/eslint-config': major
---

feat: export config as main and rename package

Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

```diff
-       "extends": "./node_modules/@talend/scripts-config-eslint/.eslintrc.js",
+       "extends": "@talend/eslint-config",
```

Note: We have to rename as the doc mention it here https://eslint.org/docs/latest/developer-guide/shareable-configs
