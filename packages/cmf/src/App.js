/**
 * The CMF App component which should be used to start your react application
 * @module react-cmf/lib/App
 * @example
import React from 'react';
import { render } from 'react-dom';
import { App, store as cmfStore } from '@talend/react-cmf';
import myreducer from './reducer';

const store = cmfstore.initialize(myreducer);
render(
	<App store={store} history={syncHistoryWithStore(browserHistory, store)} />,
	document.getElementById('app'),
);
 */
import PropTypes from 'prop-types';

import React from 'react';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';

import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';

/**
 * The React component that render your app and provide CMF environment.
 * If you don't need the router, you just have to provide a children.
 * @param  {object} props { store, history }
 * @return {object} ReactElement
 */
export default function App(props) {
	const history = props.history || createHashHistory();
	return (
		<Provider store={props.store}>
			<RegistryProvider>
				{props.children || <UIRouter history={history} />}
			</RegistryProvider>
		</Provider>
	);
}

App.propTypes = {
	store: PropTypes.object.isRequired,
	children: PropTypes.node,
	history: PropTypes.object,
};
