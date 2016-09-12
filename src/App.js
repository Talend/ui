/**
 * @module react-cmf/lib/App
 */
import React from 'react';
import { Provider } from 'react-redux';

import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';

/**
 * The React component that render your app and provide everythings you need
 * @param  {object} props store and history
 * @return {object} ReactElement
 */
const App = (props) => (
	<Provider store={props.store}>
		<RegistryProvider>
			<UIRouter history={props.history} />
		</RegistryProvider>
	</Provider>
);

App.propTypes = {
	store: React.PropTypes.object.isRequired,
	history: React.PropTypes.object,
};

export default App;
