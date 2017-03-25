/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import 'bootstrap-talend-theme/src/theme/theme.scss';
import React from 'react';
import { render } from 'react-dom';
import { App, store as cmfstore, actions } from 'react-cmf';

import configure from './configure';
import appReducer from './reducers';

/**
 * Initialize CMF configuration
 * - Register your components in the CMF dictionary
 * - Register action creators in CMF actions dictionary
 */
configure.initialize();

/**
 * Register your app reducers
 */
const store = cmfstore.initialize(appReducer);

/**
 * Fetch the CMF settings and configure the CMF app
 */
store.dispatch(actions.settingsActions.fetchSettings('/settings.json'));

/**
 * Render the CMF App
 */
render(
	<App store={store} />,
	document.getElementById('app')
);
