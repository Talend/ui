import React from 'react'; // don't forget that for the compiler...
import { render } from 'react-dom';
import { App, initializeStore, actions } from 'react-cmf';

import configure from './configure';

configure.initialize();
const store = initializeStore();
store.dispatch(actions.settingsActions.fetchSettings());

render(
	<App store={store} />,
	document.getElementById('app')
);
