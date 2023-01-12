---
'@talend/scripts-config-jest': major
---

feat: export config from main

Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

```diff
- const defaults = require('@talend/scripts-config-jest/jest.config.js');
+ const defaults = require('@talend/scripts-config-jest');
```

