import i18n, { use } from 'i18next';
import XHR from 'i18next-xhr-backend';

use(XHR)
	.init({
		// locales load path. lng = language, ns = namespace
		// backend: {
		// 	loadPath: '/locales/{{lng}}/{{ns}}.json',
		// },

		// have a common namespace used around the full app
		// ns: ['common'],
		// defaultNS: 'common',

		// Fallback language
		// fallbackLng: 'en',

		debug: false,
		wait: true, // globally set to wait for loaded translations in translate hoc
	});


export default i18n;
