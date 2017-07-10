import React from 'react';
import { I18nextProvider } from 'react-i18next';

export default function TranslateWrapper(WrappedComponent, { i18n }) {
	function TranslatedComponent(props) {
		return (
			<I18nextProvider i18n={i18n}>
				<WrappedComponent {...props} />
			</I18nextProvider>
		);
	}

	TranslatedComponent.propTypes = WrappedComponent.propTypes;
	TranslatedComponent.displayName = `Translated(${WrappedComponent.displayName})`;

	return TranslatedComponent;
}
