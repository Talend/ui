/**
 * @module react-cmf/lib/App
 */
import React from 'react';
import { Provider } from 'react-redux';

import history from './history';
import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';

/*
 * The React component that render your app and provide everythings you need
 * @param  {object} props store and history
 * @return {object} ReactElement
 */
export default function App(props) {
	const hist = props.history || history.get(props.store);
	return (
		<Provider store={props.store}>
			<RegistryProvider>
				{props.children || <UIRouter history={hist} />}
			</RegistryProvider>
		</Provider>
	);
}

App.propTypes = {
	store: React.PropTypes.object.isRequired,
	children: React.PropTypes.node,
	history: React.PropTypes.object,
};
