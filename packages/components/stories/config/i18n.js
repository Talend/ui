import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

i18n
	.use(XHR)
	.init({
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: 'en',
		// wait: true, // globally set to wait for loaded translations in translate hoc

		// have a common namespace used around the full app
		// ns: ['common'],
		// defaultNS: 'common',

		debug: true,

		// react i18next special options (optional)
		react: {
			wait: true, // set to true if you like to wait for loaded in every translated hoc
		},
	});


export default i18n;
