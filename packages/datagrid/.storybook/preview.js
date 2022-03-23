import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';
import { namespaces as componentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as datagridNamespaces } from '@talend/locales-tui-components/namespaces';
import cmf from '@talend/react-cmf';
import cmfModule, { settings } from './cmfModule';

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
			<React.Suspense fallback={null}>
				<Story />
			</React.Suspense>
		</App>
	),
];
