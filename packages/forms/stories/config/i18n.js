import i18n from 'i18next';

i18n
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
