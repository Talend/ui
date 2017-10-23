/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import '@talend/bootstrap-theme/src/theme/theme.scss';
import React from 'react';
import { render } from 'react-dom';
import { App, store as cmfstore, actions } from '@talend/react-cmf';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import configure from './configure';
import appReducer from './reducers';

/**
 * Initialize CMF configuration
 * - Register your components in the CMF dictionary
 * - Register action creators in CMF actions dictionary
 */
configure.initialize();

/**
 * Register react-router-redux router reducer (see https://github.com/reactjs/react-router-redux)
 */
cmfstore.setRouterMiddleware(routerMiddleware(browserHistory));

/**
 * Register your app reducers
 */
const store = cmfstore.initialize(appReducer);

/**
 * Fetch the CMF settings and configure the CMF app
 */
store.dispatch(actions.settings.fetchSettings('/settings.json'));

/**
 * Render the CMF App
 */
render(
	<App store={store} history={syncHistoryWithStore(browserHistory, store)} />,
	document.getElementById('app')
);
