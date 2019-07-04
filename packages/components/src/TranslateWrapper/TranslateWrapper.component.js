import React from 'react';
import { I18nextProvider } from 'react-i18next';

export default function getTranslated(WrappedComponent, { i18n }) {
	function TranslatedComponent(props) {
		console.warn(
			'I18nextProvider has deprecated. You should use i18n.use(initReactI18next).init(...) instead',
		);
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
