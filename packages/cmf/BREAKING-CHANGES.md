# 1.0 -> 2.0

## extract out react-router (#1842)

[PR #1842](https://github.com/Talend/ui/pull/1842)
[jira TUI-271](https://jira.talendforge.org/browse/TUI-271)

First setup it reading the [@talend/react-cmf-router documentation](https://www.npmjs.com/package/@talend/react-cmf-router).

brefore
```javascript
import cmf from '@talend/react-cmf';

cmf.bootstrap({
    history,
    sagaRouterConfig,
});
```

after
```javascript
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';

const router = getRouter({ history, sagaRouterConfig });

cmf.bootstrap({
    modules: [router.cmfModule],
    RootComponent: router.RootComponent,
});
```


### matchPath

```javascript
//before
import matchPath from '@talend/react-cmf/lib/sagaRouter/matchPath';
//after
import matchPath from '@talend/react-cmf/lib/matchPath';
```

### selectors

```javascript
//before
import cmf from '@talend/react-cmf';
cmf.selectors.router.getPath(state);
cmf.selectors.router.getLocation(state);
//after
import { routerAPI } from '@talend/react-router';
routerAPI.selectors.getPath(state);
routerAPI.selectors.getLocation(state);
```

## saga documentTitle

This saga is started by the module so if you have written down the following you have to update:

```javascript
// before
import cmf from '@talend/react-cmf';

function* mainSaga() {
    yield fork(cmf.sagas.changeDocumentTitle);
    //...
}
// after
// just remove that the setup of @talend/react-cmf-router is doing it.
```
