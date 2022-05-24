import React from 'react';
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
	chromatic: {
		// To avoid issues with charts, we'll need to improve this later on
		diffThreshold: 0.6,
	},
};
