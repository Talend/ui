import React from 'react';
import cmf from '@talend/react-cmf';
import { ThemeProvider } from '@talend/design-system';

import cmfModule, { settings } from './cmfModule';

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
