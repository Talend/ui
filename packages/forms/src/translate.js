import { createInstance } from 'i18next';
import { setI18n, getI18n } from 'react-i18next';

// eslint-disable-next-line import/prefer-default-export
export default function getDefaultT() {
	const i18n = getI18n();
	if (i18n && i18n.t) {
		return i18n.t.bind(getI18n());
	}
	return global.I18NEXT_T;
}

if (!getI18n()) {
	console.warn('@talend/react-forms used without i18n host.');
	setI18n(createInstance({}, () => {}));
}
