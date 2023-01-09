---
'@talend/scripts-config-eslint': major
---

feat: export config as main

Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

```diff
-       "extends": "./node_modules/@talend/scripts-config-eslint/.eslintrc.js",
+       "extends": "@talend/scripts-config-eslint",
```

