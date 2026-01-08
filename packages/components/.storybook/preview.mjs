import { namespaces as tuiNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';

export const i18n = {
	namespaces: [...tuiNamespaces, ...dsNamespaces],
	remoteLocalesMap: {
		'tui-components':
			'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
		'design-system': 'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
	},
};

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	options: {
		// storySort: {
		// 	order: [
		// 		'Design Principles',
		// 		'Writing Principles',
		// 		'Navigation',
		// 		'Layout',
		// 		'Buttons',
		// 		'Messaging & Communication',
		// 		'Form',
		// 		'Data',
		// 		'Deprecated',
		// 	],
		// },
	},
};
