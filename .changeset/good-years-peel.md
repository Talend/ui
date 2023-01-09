---
'@talend/scripts-config-stylelint': major
---

feat: expose config from main

Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

```diff
-const defaults = require('@talend/scripts-config-stylelint/.stylelintrc.js');
+const defaults = require('@talend/scripts-config-stylelint');

```

