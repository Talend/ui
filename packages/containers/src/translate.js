import { createInstance } from 'i18next';
import { getI18n, setI18n } from 'react-i18next';

export default function getDefaultT() {
	return getI18n().t.bind(getI18n());
}

if (!getI18n()) {
	// eslint-disable-next-line no-console
	console.warn('@talend/react-containers used without i18n host.');
	if (createInstance) {
		setI18n(createInstance({}, () => {}));
	}
}
