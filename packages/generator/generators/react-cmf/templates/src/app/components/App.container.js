import React from 'react';
import {
	IconsProvider,
} from 'react-talend-components';

import {
	Notification,
} from 'react-talend-containers';

const App = (props) => (
	<div>
		<IconsProvider />
		<Notification />
		{props.children}
	</div>
);
App.propTypes = {
	//store: React.PropTypes.object.isRequired,
};

export default App;
