import i18next from 'i18next';
import { setI18n, getI18n } from 'react-i18next';
function getDefaultT() {
	return getI18n().t.bind(getI18n());
}
if (!getI18n()) {
	console.warn('@talend/react-stepper used without i18n host.');
	setI18n(i18next.createInstance({}, () => {}));
}
export { getDefaultT as default };
//# sourceMappingURL=translate.js.map
