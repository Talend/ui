import i18next from 'i18next';
import { setI18n, getI18n } from 'react-i18next';

export default function getDefaultT() {
	return getI18n().t.bind(getI18n());
}

if (!getI18n()) {
	// eslint-disable-next-line no-console
	console.warn('@talend/react-datagrid used without i18n host.');
	setI18n(i18next.createInstance({}, () => {}));
}
