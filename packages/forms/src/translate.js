import { createInstance } from 'i18next';

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
const DEFAULT_I18N = createInstance({}, () => {});

export function getDefaultTranslate(key, options) {
	return options.defaultValue;
}

export function getDefaultI18n() {
	return DEFAULT_I18N;
}
