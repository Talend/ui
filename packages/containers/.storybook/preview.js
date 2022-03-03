import React from 'react';
import cmf from '@talend/react-cmf';
import { ThemeProvider } from '@talend/design-system';
import { namespaces as componentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as formsNamespaces } from '@talend/locales-tui-forms/namespaces';
import { namespaces as containersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';

export const namespaces = [componentsNamespaces, containersNamespaces, formsNamespaces];

import cmfModule, { settings } from './cmfModule';

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

export const loaders = [
	async () => {
		const { store, saga, App } = await cmf.bootstrap({
			render: false,
			modules: [cmfModule],
		});
		saga.run();
		store.dispatch(cmf.actions.settings.receiveSettings(settings));
		return { store, App };
	},
];

export const decorators = [
	(Story, { loaded: { store, App } }) => (
		<App store={store} registry={cmf.registry.getRegistry()}>
			<ThemeProvider>
				<React.Suspense fallback={null}>
					<Story />
				</React.Suspense>
			</ThemeProvider>
		</App>
	),
];

export const parameters = { layout: 'fullscreen' };
