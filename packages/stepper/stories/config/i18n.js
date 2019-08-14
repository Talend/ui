import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18N_DOMAIN_STEPPER from '../../src/components/constant';

i18n.use(initReactI18next).init({
	lng: 'en',
	resources: {
		en: {
			[I18N_DOMAIN_STEPPER]: {
				ABORTED: ' (Aborted)',
			},
		},
		fr: {
			[I18N_DOMAIN_STEPPER]: {
				ABORTED: ' (Annulé)',
			},
		},
	},
	debug: false,
	wait: true, // globally set to wait for loaded translations in translate hoc
});

export const LanguageSwitcher = () => {
	const style = {
		position: 'fixed',
		bottom: 0,
		width: '100vw',
		textAlign: 'center',
		zIndex: 1,
	};

	function renderBtn(locale, isDefault) {
		return (
			<button className="btn" onClick={() => i18n.changeLanguage(locale)}>
				{locale} {isDefault && '(default)'}
			</button>
		);
	}

	return (
		<nav style={style}>
			<div className="btn-group">
				{renderBtn('en', true)}
				{renderBtn('fr')}
			</div>
		</nav>
	);
};

export default i18n;
