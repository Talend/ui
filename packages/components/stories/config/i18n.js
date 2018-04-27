import React from 'react';
import i18next from 'i18next';
import I18N_DOMAIN_COMPONENTS from '../../src/constants';

const LOCALES_FR = require('../../locales/fr/tui-components.json');
const LOCALES_JA = require('../../locales/ja/tui-components.json');
const LOCALES_EN = require('../../locales/en/tui-components.json');

i18next.init({
	resources: {
		en: {
			[I18N_DOMAIN_COMPONENTS]: LOCALES_EN,
		},
		fr: {
			[I18N_DOMAIN_COMPONENTS]: LOCALES_FR,
		},
		ja: {
			[I18N_DOMAIN_COMPONENTS]: LOCALES_JA,
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
			<button className="btn" onClick={() => i18next.changeLanguage(locale)}>
				{locale} {isDefault && '(default)'}
			</button>
		);
	}

	return (
		<nav style={style}>
			<div className="btn-group">
				{renderBtn('en', true)}
				{renderBtn('fr')}
				{renderBtn('ja')}
			</div>
		</nav>
	);
};

export default i18next;
