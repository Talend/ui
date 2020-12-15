import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { namespaces as tuiNamespaces } from '@talend/locales-tui/namespaces';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

import { namespaces as dataVizNamespaces } from '@talend/locales-tui-dataviz/namespaces';
import { locales as dataVizLocales } from '@talend/locales-tui-dataviz/locales';

i18n.use(initReactI18next).init({
	debug: true,
	defaultNS: dataVizNamespaces[0],
	fallbackLng: 'en',
	fallbackNS: [...tuiNamespaces, ...dataVizNamespaces],
	interpolation: {
		escapeValue: false,
	},
	ns: [...tuiNamespaces, ...dataVizNamespaces],
	resources: Object.keys(dataVizLocales).reduce(
		(resources, language) => ({
			...resources,
			[language]: {
				...tuiLocales[language],
				...dataVizLocales[language],
			},
		}),
		{},
	),
	wait: true,
});

window.i18n = i18n;

export default i18n;
