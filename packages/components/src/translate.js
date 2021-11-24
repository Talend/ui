import i18next from 'i18next';
import { setI18n, getI18n } from 'react-i18next';

if (!getI18n()) {
	// eslint-disable-next-line no-console
	console.warn('@talend/react-components used without i18n host.');
	// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
	setI18n(i18next.createInstance({}, () => {}));
}

export function getI18nInstance() {
	if (!getI18n()) {
		return i18next.createInstance({}, () => {});
	}
	return i18next;
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
