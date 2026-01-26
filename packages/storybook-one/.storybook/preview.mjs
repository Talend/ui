import { createPreviewConfig } from '@talend/storybook-config/preview';
import { namespaces as tuiContainersNamespaces } from '@talend/locales-tui-containers/namespaces';
import { namespaces as tuiComponentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as designSystemNamespaces } from '@talend/locales-design-system/namespaces';
import { namespaces as tuiFacetedSearchNamespaces } from '@talend/locales-tui-faceted-search/namespaces';
import { namespaces as tuiFormsNamespaces } from '@talend/locales-tui-forms/namespaces';

export default createPreviewConfig({
	i18n: {
		namespaces: [
			...designSystemNamespaces,
			...tuiComponentsNamespaces,
			...tuiContainersNamespaces,
			...tuiFormsNamespaces,
			...tuiFacetedSearchNamespaces,
		],
		remoteLocalesMap: {
			'tui-components':
				'https://statics.cloud.talend.com/@talend/locales-tui-components/16.0.1/locales/{{lng}}/{{ns}}.json',
			'design-system':
				'https://statics.cloud.talend.com/@talend/locales-design-system/7.15.1/locales/{{lng}}/{{ns}}.json',
			'tui-containers':
				'https://statics.cloud.talend.com/@talend/locales-tui-containers/9.1.3/locales/{{lng}}/{{ns}}.json',
			'tui-forms':
				'https://statics.cloud.talend.com/@talend/locales-tui-forms/15.2.0/locales/{{lng}}/{{ns}}.json',
			'tui-faceted-search':
				'https://statics.cloud.talend.com/@talend/locales-tui-faceted-search/11.3.0/locales/{{lng}}/{{ns}}.json',
		},
	},
	parameters: {},
});
