import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';
import { namespaces as componentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as datagridNamespaces } from '@talend/locales-tui-datagrid/namespaces';

export const namespaces = [dsNamespaces, componentsNamespaces, datagridNamespaces];

export const i18n = {
	namespaces: [...dsNamespaces, ...componentsNamespaces, ...datagridNamespaces],
	remoteLocalesMap: {
		'tui-datagrid': 'https://unpkg.com/@talend/locales-tui-datagrid/locales/{{lng}}/{{ns}}.json',
		'tui-components':
			'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
		'design-system': 'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
	},
};

export const parameters = {
	chromatic: {
		// Disable by default and enable only on some stories
		disableSnapshot: true,
	},
};
