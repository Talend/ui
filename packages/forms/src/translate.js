import { createInstance } from 'i18next';

export function getDefaultTranslate(key, options) {
	return options.defaultValue;
}

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
export const DEFAULT_I18N = createInstance({}, () => {});
