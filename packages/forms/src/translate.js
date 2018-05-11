import { createInstance } from 'i18next';
import { setI18n } from 'react-i18next';

// eslint-disable-next-line import/prefer-default-export
export function getDefaultTranslate(key, options) {
	return options.defaultValue;
}

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
setI18n(createInstance({}, () => {}));
