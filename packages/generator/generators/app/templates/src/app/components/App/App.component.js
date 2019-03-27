import React from 'react';
import PropTypes from 'prop-types';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import Notification from '@talend/react-containers/lib/Notification';

import DatasetList from '../DatasetList';

export default function App() {
	/**
	 * Instanciate all global components here
	 * Ex : we register @talend/react-components <IconsProvider />
	 * so that all icons are available in each view
	 */
	return (
		<div>
			<IconsProvider />
			<Notification />
			<DatasetList />
		</div>
	);
}

App.propTypes = {
	children: PropTypes.element,
};
