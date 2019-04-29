import i18n from 'i18next';
import { namespaces as tuiNamespaces, locales as tuiLocales } from '@talend/locales-tui';

i18n.init({
	fallbackLng: 'en',
	debug: false,

	interpolation: {
		escapeValue: false, // not needed for react!!
	},
	ns: [...tuiNamespaces, 'app'],
	defaultNS: 'app',

	// react i18next special options (optional)
	react: {
		wait: false, // set to true if you like to wait for loaded in every translated hoc
		nsMode: 'default', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
	},
	resources: tuiLocales,
});

export default i18n;
