import { createInstance } from 'i18next';
import { setI18n, getI18n } from 'react-i18next';

// eslint-disable-next-line import/prefer-default-export
export default function getDefaultT() {
	return getI18n().t.bind(getI18n());
}

if (!getI18n()) {
	// eslint-disable-next-line no-console
	console.warn('@talend/react-forms used without i18n host.');
	setI18n(createInstance({}, () => {}));
}
