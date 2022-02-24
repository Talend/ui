import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { namespaces } from '@talend/locales-tui-components/namespaces';
import { locales } from '@talend/locales-tui-components/locales';

i18n.use(initReactI18next).init({
	debug: false,
	defaultNS: namespaces[0],
	fallbackLng: 'en',
	fallbackNS: namespaces,
	interpolation: {
		escapeValue: false,
	},
	ns: namespaces,
	resources: Object.keys(locales).reduce(
		(resources, language) => ({
			...resources,
			[language]: {
				...locales[language],
			},
		}),
		{},
	),
	wait: true,
});

window.i18n = i18n;

export default i18n;
