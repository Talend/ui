import React from 'react'; // don't forget that for the compiler...
import { render } from 'react-dom';
import { App, initializeStore, actions } from 'react-cmf';
import createLogger from 'redux-logger';

const logger = createLogger();

import configure from './configure';

configure.initialize();
const store = initializeStore(undefined, undefined, undefined, [logger]);
store.dispatch(actions.settingsActions.fetchSettings());

render(
	<App store={store} />,
	document.getElementById('app')
);
