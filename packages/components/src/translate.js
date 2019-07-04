import i18next, { createInstance } from 'i18next';
import { setI18n, getI18n } from 'react-i18next';

if (!getI18n()) {
	console.warn('@talend/react-components used without i18n host.');
	setI18n(createInstance({}, () => {}));
}

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
