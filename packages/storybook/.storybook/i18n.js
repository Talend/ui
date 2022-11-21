import { namespaces as designSystemNamespaces } from '@talend/locales-design-system/namespaces';
import { locales as designSystemLocales } from '@talend/locales-design-system/locales';

console.log('### ns', designSystemNamespaces);

export default {
	suspense: false,
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
};
