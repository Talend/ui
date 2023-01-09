---
'@talend/scripts-config-prettier': major
---

feat: export config as main

Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

```diff
-const defaults = require('@talend/scripts-config-prettier/.prettierrc.js');
+const defaults = require('@talend/scripts-config-prettier');
```

