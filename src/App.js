import React from 'react';
import { Provider } from 'react-redux';

import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';

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
