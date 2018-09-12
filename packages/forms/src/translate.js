import { createInstance } from 'i18next';
import { setI18n, getI18n } from 'react-i18next';

// eslint-disable-next-line import/prefer-default-export
export default function getDefaultT() {
	return getI18n().t.bind(getI18n());
}

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
setI18n(createInstance({}, () => {}));
