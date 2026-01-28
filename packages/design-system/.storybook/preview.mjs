import { namespaces as designSystemNamespaces } from '@talend/locales-design-system';

import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/preview';

export default createPreviewConfig({
	i18n: {
		namespaces: [...designSystemNamespaces],
		remoteLocalesMap: {
			'design-system':
				'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
		},
	},
});
