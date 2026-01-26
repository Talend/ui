import '@talend/bootstrap-theme/dist/bootstrap.css';
import { namespaces as tuiContainersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as tuiComponentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';
import cmfModule from './cmfModule';
import {
	createPreviewConfig,
	initI18n,
	configureCmfModules,
} from '@talend/storybook-config/preview';

const preview = createPreviewConfig(
	{
		parameters: {},
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
		cmf: {
			modules: [cmfModule],
		},
	},
	initI18n,
	configureCmfModules,
);

export default preview;
