import { createInstance } from 'i18next';
import { getI18n, setI18n } from 'react-i18next';

export default function getDefaultT() {
	const i18n = getI18n();
	if (i18n && i18n.t) {
		return i18n.t.bind(getI18n());
	}
	return global.I18NEXT_T;
}

if (!getI18n()) {
	console.warn('@talend/react-containers used without i18n host.');
	setI18n(createInstance({}, () => {}));
}
