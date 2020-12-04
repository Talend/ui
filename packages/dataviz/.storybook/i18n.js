import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	debug: true,
	defaultNS: 'tui-dataviz',
	fallbackLng: 'en',
	fallbackNS: [],
	interpolation: {
		escapeValue: false,
	},
	ns: [],
	resources: {},
	wait: true,
});

window.i18n = i18n;

export default i18n;
