/**
 * Internal module, you should not use it directly
 * @module react-cmf/lib/App
 */
import PropTypes from 'prop-types';

import React from 'react';
import { Provider } from 'react-redux';

import RegistryProvider from './RegistryProvider';

/**
 * The React component that render your app and provide CMF environment.
 * @param  {object} props { store }
 * @return {object} ReactElement
 */
export default function App(props) {
	return (
		<Provider store={props.store}>
			<RegistryProvider>{props.children}</RegistryProvider>
		</Provider>
	);
}

App.propTypes = {
	store: PropTypes.object.isRequired,
	children: PropTypes.node,
};
