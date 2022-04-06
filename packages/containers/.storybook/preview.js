import { namespaces as componentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as formsNamespaces } from '@talend/locales-tui-forms/namespaces';
import { namespaces as containersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';

import cmfModule, { settings } from './cmfModule';
import { ThemeProvider } from '@talend/design-system';

export const i18n = {
	namespaces: [
		...componentsNamespaces,
		...containersNamespaces,
		...formsNamespaces,
		...dsNamespaces,
	],
	remoteLocalesMap: {
		'tui-components':
			'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
		'tui-containers':
			'https://unpkg.com/@talend/locales-tui-containers/locales/{{lng}}/{{ns}}.json',
		'tui-forms': 'https://unpkg.com/@talend/locales-tui-forms/locales/{{lng}}/{{ns}}.json',
		'design-system': 'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
	},
};

export const decorators = [
	(Story, context) => (
		<ThemeProvider>
			<Story {...context} />
		</ThemeProvider>
	),
];

export const cmf = {
	modules: [cmfModule],
	settings,
};

export const parameters = { layout: 'fullscreen' };
