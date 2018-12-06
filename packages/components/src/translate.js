import i18next, { createInstance } from 'i18next';
import { setI18n, getI18n } from 'react-i18next';

export default function getDefaultT() {
	const i18n = getI18n();
	if (i18n) {
		return i18n.t.bind(getI18n());
	}
	return global.I18NEXT_T;
}

export function getCurrentLanguage() {
	if (i18next.language) {
		return i18next.language;
	}
	return 'en';
}
// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
if (createInstance) {
	setI18n(createInstance({}, () => {}));
} else {
	console.error('createInstance is undefined');
}
