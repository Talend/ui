import React from 'react';
import PropTypes from 'prop-types';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
<%-
	props.i18n
		? `
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
`
		: ''
%>
import Home from '../Home';

export default function App() {
	/**
	 * Instanciate all global components here
	 * Ex : we register @talend/react-components <IconsProvider />
	 * so that all icons are available in each view
	 */
	return (
<%-
	props.i18n ?
`		<I18nextProvider i18n={i18n}>
			<React.Fragment>
				<IconsProvider />
				<Home />
			</React.Fragment>
		</I18nextProvider>
` :
`
		<React.Fragment>
			<IconsProvider />
			<Home />
		</React.Fragment>
`
%>
	);
}

App.propTypes = {
	children: PropTypes.element,
};
