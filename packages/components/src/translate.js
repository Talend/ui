import i18next, { createInstance } from 'i18next';
import { setI18n, getI18n } from 'react-i18next';
import enLocale from 'date-fns/locale/en';
import frLocale from 'date-fns/locale/fr';
import jaLocale from 'date-fns/locale/ja';

export default function getDefaultT() {
	return getI18n().t.bind(getI18n());
}

export function getCurrentLanguage() {
	if (!i18next.language) {
		return 'en';
	}

	return i18next.language;
}

export function getCurrentDateFnsLocale() {
	const language = getCurrentLanguage();
	switch (language) {
		case 'en':
			return enLocale;
		case 'fr':
			return frLocale;
		case 'ja':
			return jaLocale;
		default:
			return enLocale;
	}
}

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
setI18n(createInstance({}, () => {}));
