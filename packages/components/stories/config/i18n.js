import React from 'react';
import i18next from 'i18next';
import I18N_DOMAIN_COMPONENTS from '../../src/constants';

let i18nInitialized = false;
const languages = ['en', 'fr', 'ja'];

if (process.env.NODE_ENV === 'production') {
	const resources = {};
	languages.forEach(lng => {
		resources[lng] = {
			[I18N_DOMAIN_COMPONENTS]: require(`../../locales/${lng}/tui-components.json`),
		};
	});
	i18next.init({
		resources,
		debug: false,
		wait: true, // globally set to wait for loaded translations in translate hoc
	});
	i18nInitialized = true;
} else {
	i18next.createInstance({});
}

export const LanguageSwitcher = () => {
	if (!i18nInitialized) {
		return null;
	}
	const style = {
		position: 'fixed',
		bottom: 0,
		width: '100vw',
		textAlign: 'center',
		zIndex: 1,
	};

	function renderBtn(locale, key) {
		return (
			<button key={key} className="btn" onClick={() => i18next.changeLanguage(locale)}>
				{locale} {locale === 'en' && '(default)'}
			</button>
		);
	}

	return (
		<nav style={style}>
			<div className="btn-group">
				{languages.map(renderBtn)}
			</div>
		</nav>
	);
};

export default i18next;
