import type { Preview } from '@storybook/react';
import '@talend/bootstrap-theme/dist/bootstrap.css';

import { namespaces as tuiNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';
import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/preview';

const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	chromatic: {
		// To avoid issues with charts, we'll need to improve this later on
		diffThreshold: 0.6,
	},
};

const preview: Preview = createPreviewConfig({
	parameters,
	i18n: {
		namespaces: [...tuiNamespaces, ...dsNamespaces],
		remoteLocalesMap: {
			'tui-components':
				'https://statics.cloud.talend.com/@talend/locales-tui-components/16.0.1/locales/{{lng}}/{{ns}}.json',
			'design-system':
				'https://statics.cloud.talend.com/@talend/locales-design-system/7.15.1/locales/{{lng}}/{{ns}}.json',
		},
	},
});

export default preview;
