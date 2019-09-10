# @talend/react-cmf-router

This is the old router of react-cmf packaged as external dependency.

## Setup

First add it to your bootstrap app

```javascript
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';

const routerFunctions = {
    // key for OnEnter/onLeave in router config: value is the function
};

const router = getRouter({ history, sagaRouterConfig, routerFunctions });

cmf.bootstrap({
    modules: [router.cmfModule],
    RootComponent: router.RootComponent,
});
```

If your project has multiple modules with `routerConfig` you can pass all of them to `getRouter()` the following way:


```javascript
const router = getRouter(config1, config2, config3);
```

The `getRouter` function will merge all of them to build the router configuration.

So be careful with the order since the next has a higher priority comparing to the previous config.

## routerAPI

routerAPI is an object which expose the following api:


| name | return type | description|
| -- | -- | -- |
| `routerAPI.selectors.getLocation(state)` | object | current [location object](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md) |
| `routerAPI.selectors.getPath(state)` | string |  the current path (a string) which is the fragment so you can apply matchPath to it |
