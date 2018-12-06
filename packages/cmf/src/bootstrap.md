# react-cmf bootstrap

This api help you to start without importing anything except your code and cmf itself

Quick start:

```javascript
// /src/app/index.js
import cmf from '@talend/react-cmf';
import containersModule from '@talend/react-containers';
import components from './components';
import sagas from './sagas';

cmf.bootstrap({
	components,
	saga: sagas.appSaga,
	sagaRouterConfig: sagas.routes,
});
```

## Options

| name | type | default | description |
| -- | -- | -- | -- |
| settingsURL | string | '/settings.json' | URL to fetch the cmf settings.json file |
| appId | string | 'app' | DOM element id, where to render the React application |
| history | Object | `{ hashHistory } from 'react-router'` | The history object to control the router |
| components | Object | undefined | A components dictionary where each key/value are registered in cmf registry so you can refer them in settings |
| actionCreators | Object | undefined | Same dictionary as `components` option for actionsCreators |
| expressions | Object | undefined | Same dictionary as `components` option for expressions |
| sagas | Object | undefined | Same dictionary as `components` option for sagas |
| httpMiddleware | function | undefined | Override the default http middleware |
| preReducer | function | undefined | Redux preReducer, called on every actions before reducer |
| enhancer | function | undefined |Redux enhancer |
| reducer | Object or function | undefined | Redux reducer. This is added with the internal reducers. |
| preloadedState | Object | undefined | Redux state to preload. This is the initial state on Redux bootstrap. |
| middlewares | Array | undefined | Redux middlewares |
| storeCallback | function | undefined | Let you call a function once the store is created |
| AppLoader | React Component | undefined | Let you define the React component to use to show the app is currently loading (waiting for the settings) |
| modules | Array | undefined | Array of module definition to bootstrap with the app |

## Modules

You apps may be splitted into different modules, like a core set of components and some other business logics.

For that CMF expose an API to let you merge your settings:

```javascript
// /src/app/index.js
import cmf from '@talend/react-cmf';
import containersModule from '@talend/react-containers';
import components from './components';
import sagas from './sagas';

cmf.bootstrap({
	components,
	saga: sagas.appSaga,
	sagaRouterConfig: sagas.routes,
	modules: [
		containersModule,
	],
});
```

## How to setup store using localStorage ?

We provide a [simple API for that](./localStorage.md).
