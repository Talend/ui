# 1.0 -> 2.0

## extract out react-router (#1842)

[PR #1842](https://github.com/Talend/ui/pull/1842)
[jira TUI-271](https://jira.talendforge.org/browse/TUI-271)

First setup it reading the [@talend/react-cmf-router documentation](https://www.npmjs.com/package/@talend/react-cmf-router).

```diff
import cmf from '@talend/react-cmf';
import { browserHistory } from 'react-router';
+import getRouter from '@talend/react-cmf-router';
+
+const router = getRouter({ history, sagaRouterConfig });

cmf.bootstrap({
-    history: browserHistory,
-    sagaRouterConfig,
+    modules: [router.cmfModule],
+    RootComponent: router.RootComponent,
});
```


### matchPath

```diff
-import matchPath from '@talend/react-cmf/lib/sagaRouter/matchPath';
+import matchPath from '@talend/react-cmf/lib/matchPath';
```

### selectors

```diff
-import cmf from '@talend/react-cmf';
+import { routerAPI } from '@talend/react-router';
-cmf.selectors.router.getPath(state);
-cmf.selectors.router.getLocation(state);
+routerAPI.selectors.getPath(state);
+routerAPI.selectors.getLocation(state);
```

## saga documentTitle

This saga is started by the module so if you have written down the following you have to update:

```diff
-import cmf from '@talend/react-cmf';

-function* mainSaga() {
-    yield fork(cmf.sagas.changeDocumentTitle);
-}
```

## Redirect container rename

```diff
{
    "props": {
-        "RedirectContainer#default": {
+        "Redirect#default": {
            to: "/datastores"
        }
    }
}
```

Because it is exported and registered as `Redirect` but has a displayName="RedirectContainer".
