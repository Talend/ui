import { createInstance } from 'i18next';
import { getI18n, setI18n } from 'react-i18next';

export default function getDefaultT() {
	return getI18n().t.bind(getI18n());
}

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
setI18n(createInstance({}, () => {}));
