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
import { Provider, connect } from 'react-redux';
import get from 'lodash/get';

import history from './history';
import RegistryProvider from './RegistryProvider';
import Inject from './Inject.component';

function AppSettings({ loading, initialized, routerHistory, children }) {
	if (initialized) {
		return children(routerHistory);
	}
	if (loading) {
		return <Inject component={loading} />;
	}
	return <div className="is-loading">loading</div>;
}
AppSettings.propTypes = {
	children: PropTypes.func,
	routerHistory: PropTypes.object,
	initialized: PropTypes.bool,
	loading: PropTypes.node,
};
const ConnectedAppSettings = connect(state => ({
	initialized: get(state, 'cmf.settings.initialized'),
}))(AppSettings);

/**
 * The React component that render your app and provide CMF environment.
 * If you don't need the router, you just have to provide a children.
 * @param  {object} props { store, history }
 * @return {object} ReactElement
 */
export default function App(props) {
	const hist = props.history || history.get(props.store);
	return (
		<Provider store={props.store}>
			<RegistryProvider>
				<ConnectedAppSettings routerHistory={hist} loading={props.loading}>
					{props.children}
				</ConnectedAppSettings>
			</RegistryProvider>
		</Provider>
	);
}

App.propTypes = {
	store: PropTypes.object.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	history: PropTypes.object,
	loading: PropTypes.string,
};
