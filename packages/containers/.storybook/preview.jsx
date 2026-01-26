import '@talend/bootstrap-theme/dist/bootstrap.css';
import { namespaces as tuiContainersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as tuiComponentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';
import cmfModule, { settings } from './cmfModule';
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
					'https://statics.cloud.talend.com/@talend/locales-tui-containers/9.1.3/locales/{{lng}}/{{ns}}.json',
				'tui-components':
					'https://statics.cloud.talend.com/@talend/locales-tui-components/16.0.1/locales/{{lng}}/{{ns}}.json',
				'design-system':
					'https://statics.cloud.talend.com/@talend/locales-design-system/7.15.1/locales/{{lng}}/{{ns}}.json',
			},
		},
		cmf: {
			modules: [cmfModule],
			settings: settings,
		},
	},
	initI18n,
	configureCmfModules,
);

export default preview;
