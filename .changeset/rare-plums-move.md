---
'@talend/scripts-config-babel': major
---

feat: expose config as main

Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

```diff
{
-	"extends": "@talend/scripts-config-babel/.babelrc.json"
+	"extends": "@talend/scripts-config-babel"
}
```

