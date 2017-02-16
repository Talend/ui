import React from 'react';
import { IconsProvider } from 'react-talend-components';
import { Notification } from 'react-talend-containers';

export default function App(props) {
	/**
	 * Instanciate all global components here
	 * Ex : we register react-talend-components <IconsProvider />
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
	children: React.PropTypes.element,
};
