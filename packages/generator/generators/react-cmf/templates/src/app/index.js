import 'bootstrap-talend-theme/src/theme/theme.scss';
import React from 'react'; // don't forget that for the compiler...
import { render } from 'react-dom';
import { actions, App, store as cmfstore } from 'react-cmf';

import configure from './configure';
import reducers from './reducers';

configure.initialize();
const store = cmfstore.initialize(reducers);
store.dispatch(actions.settingsActions.fetchSettings('/settings.json'));

render(
	<App store={store} />,
	document.getElementById('app')
);
