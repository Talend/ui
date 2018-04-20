# react-cmf bootstrap

This api help you to start without importing much than the api

Quick start:

```javascript
import { api } from '@talend/react-cmf';
import configure from './configure';
import components from './components';
import sagas from './sagas';

configure.initialize();
const app = api.bootstrap({
    components,
	settingsURL: '/settings.json',
	saga: sagas.appSaga, // function* appSaga() {...}
	sagaRouterConfig: sagas.routes, // { '/foo/bar': function* bar() {...}, ... },
    ...manyMoreOptions
});
app.render();
```

## Options

| name | type | default | description |
| -- | -- | -- | -- |
| settingsURL* | string | undefined | **REQUIRED** this URL to fetch the cmf settings.json file |
| appId | string | 'app' | the default html element id to get to render react |
| history | Object | `{ hashHistory } from 'react-router'` | the history object to control the router |
| components | Object | undefined | an object with key/value to register your components |
| actionCreators | Object | undefined | an object with key/value to register your action creators |
| expressions | Object | undefined | an object with key/value to register your expressions |
| sagas | Object | undefined | an object with key/value to register your sagas |
| httpMiddleware | function | undefined | override the default http middleware |
| preReducer | function | undefined | call on every action before the other reducers |
| enhancer | function | undefined | add redux enhancer |
| reducer | Object or function | undefined | add your own app reducer |
| preloadedState | Object | undefined | start with an existing redux state |
| middlewares | Array | undefined | add some redux middlewares |

