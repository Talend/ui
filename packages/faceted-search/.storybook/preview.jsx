import { namespaces as tuiNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as facetedNamespaces } from '@talend/locales-tui-faceted-search/namespaces';
import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/preview';

export default createPreviewConfig({
	i18n: {
		namespaces: [...tuiNamespaces, ...facetedNamespaces],
		remoteLocalesMap: {
			'tui-components':
				'https://statics.cloud.talend.com/@talend/locales-tui-components/16.0.1/locales/{{lng}}/{{ns}}.json',
			'tui-faceted-search':
				'https://statics.cloud.talend.com/@talend/locales-tui-faceted-search/11.3.0/locales/{{lng}}/{{ns}}.json',
		},
	},
});
