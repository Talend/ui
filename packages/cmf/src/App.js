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

import RegistryProvider from './RegistryProvider';
import Inject from './Inject.component';

function AppSettings({ loading, initialized, history, children }) {
	if (initialized) {
		return children(history);
	}
	if (loading) {
		return <Inject component={loading} />;
	}
	return <div className="is-loading">loading</div>;
}
AppSettings.propTypes = {
	children: PropTypes.func,
	history: PropTypes.object,
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
	return (
		<Provider store={props.store}>
			<RegistryProvider>
				<ConnectedAppSettings history={props.history} loading={props.loading}>
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
