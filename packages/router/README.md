# @talend/react-cmf-router

This is the old router of react-cmf packaged as external dependency.

## Setup

First add it to your bootstrap app

```javascript
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';

const router = getRouter({ history, sagaRouterConfig });

cmf.bootstrap({
    modules: [router.cmfModule],
    RootComponent: router.RootComponent,
});
```

## routerAPI

routerAPI is an object which expose the following api:


| name | return type | description|
| -- | -- | -- |
| `routerAPI.selectors.getLocation(state)` | object | current [location object](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md) |
| `routerAPI.selectors.getPath(state)` | string |  the current path (a string) which is the fragment so you can apply matchPath to it |
