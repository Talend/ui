App component
==

This component let you start your app with all internals needed:

* react-redux's Provider
* react-cmf RegistryProvider
* react-cmf router which is on top of react-router

```javascript
import React from 'react';
import { render } from 'react-dom';
import { App, store as cmfstore, actions } from '@talend/react-cmf';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import configure from './configure';
import appReducer from './app-reducers';

configure.initialize();
cmfstore.setRouterMiddleware(routerMiddleware(browserHistory));

const store = cmfstore.initialize(
	appReducer,
	undefined,
	batchedSubscribe(notify => {
		requestAnimationFrame(notify);
	}),
	[streamMiddleware, socketMiddleware, sagaMiddleware],
);
store.dispatch(actions.settingsActions.fetchSettings('/settings.json'));

render(
	<App store={store} history={syncHistoryWithStore(browserHistory, store)} />,
	document.getElementById('app'),
);
```
