import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { namespaces as designSystemNamespaces } from '@talend/locales-design-system/namespaces';
import { locales as designSystemLocales } from '@talend/locales-design-system/locales';

i18n.use(initReactI18next).init({
	debug: false,
	defaultNS: designSystemNamespaces[0],
	fallbackLng: 'en',
	fallbackNS: designSystemNamespaces,
	interpolation: {
		escapeValue: false,
	},
	ns: designSystemNamespaces,
	resources: Object.keys(designSystemLocales).reduce(
		(resources, language) => ({
			...resources,
			[language]: {
				...designSystemLocales[language],
			},
		}),
		{},
	),
	wait: true,
});

window.i18n = i18n;

export default i18n;
