import type { Preview } from '@storybook/react';
import '@talend/bootstrap-theme/dist/bootstrap.css';
import { namespaces as tuiContainersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as tuiComponentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';
// import cmfModule from './cmfModule';
// import cmf from '@talend/react-cmf';

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: [
					'Design Principles',
					'Writing Principles',
					'Navigation',
					'Layout',
					'Buttons',
					'Messaging & Communication',
					'Form',
					'Data',
					'Deprecated',
				],
			},
		},
		i18n: {
			namespaces: [...tuiContainersNamespaces, ...tuiComponentsNamespaces, ...dsNamespaces],
			remoteLocalesMap: {
				'tui-containers':
					'https://unpkg.com/@talend/locales-tui-containers/locales/{{lng}}/{{ns}}.json',
				'tui-components':
					'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
				'design-system':
					'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
			},
		},
	},
};

export default preview;
