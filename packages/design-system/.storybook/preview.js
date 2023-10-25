import { namespaces as designSystemNamespaces } from '@talend/locales-design-system';

export const i18n = {
	namespaces: [...designSystemNamespaces],
	remoteLocalesMap: {
		'design-system': 'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
	},
};
