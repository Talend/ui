import React from 'react';
import PropTypes from 'prop-types';
import { IconsProvider } from '@talend/react-components';
import { Notification } from '@talend/react-containers';

export default function App(props) {
	/**
	 * Instanciate all global components here
	 * Ex : we register @talend/react-components <IconsProvider />
	 * so that all icons are available in each view
	 */
	return (
		<div>
			<IconsProvider />
			<Notification />
			{props.children}
		</div>
	);
}

App.propTypes = {
	children: PropTypes.element,
};
