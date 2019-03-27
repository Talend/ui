import React from 'react';
import PropTypes from 'prop-types';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

import Home from '../Home';

export default function App() {
	/**
	 * Instanciate all global components here
	 * Ex : we register @talend/react-components <IconsProvider />
	 * so that all icons are available in each view
	 */
	return (
		<React.Fragment>
			<IconsProvider />
			<Home />
		</React.Fragment>
	);
}

App.propTypes = {
	children: PropTypes.element,
};
