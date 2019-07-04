import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18N_DOMAIN_DATAGRID from '../../src/constant';

i18n.use(initReactI18next).init({
	lng: 'en',
	resources: {
		en: {
			[I18N_DOMAIN_DATAGRID]: {
				QUALITY_BAR_INVALID: '{{count}} invalid value ({{percentage}}%)',
				QUALITY_BAR_INVALID_plural: '{{count}} invalid values ({{percentage}}%)',
				QUALITY_BAR_EMPTY: '{{count}} empty value ({{percentage}}%)',
				QUALITY_BAR_EMPTY_plural: '{{count}} empty values ({{percentage}}%)',
				QUALITY_BAR_VALID: '{{count}} valid value ({{percentage}}%)',
				QUALITY_BAR_VALID_plural: '{{count}} valid values ({{percentage}}%)',
				QUALITY_INDICATOR_INVALID_VALUE: 'Invalid value',
			},
		},
		fr: {
			[I18N_DOMAIN_DATAGRID]: {
				QUALITY_BAR_INVALID: '{{count}} valeur invalide ({{percentage}}%)',
				QUALITY_BAR_INVALID_plural: '{{count}} valeurs invalides ({{percentage}}%)',
				QUALITY_BAR_EMPTY: '{{count}} valeur vide ({{percentage}}%)',
				QUALITY_BAR_EMPTY_plural: '{{count}} valeurs vides ({{percentage}}%)',
				QUALITY_BAR_VALID: '{{count}} valeur valide ({{percentage}}%)',
				QUALITY_BAR_VALID_plural: '{{count}} valeurs valides ({{percentage}}%)',
				QUALITY_INDICATOR_INVALID_VALUE: 'Valeur invalide',
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
