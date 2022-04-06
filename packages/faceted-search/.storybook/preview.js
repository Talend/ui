import React from 'react';
import {ThemeProvider} from '@talend/design-system';
import { namespaces as tuiNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as facetedNamespaces } from '@talend/locales-tui-faceted-search/namespaces';

export const i18n = {
	namespaces: [...tuiNamespaces, ...facetedNamespaces],
	remoteLocalesMap: {
		'tui-components':
			'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
		'tui-faceted-search':
			'https://unpkg.com/@talend/locales-tui-faceted-search/locales/{{lng}}/{{ns}}.json',
	},
};

export const decorators = [
	(Story, context) => {
		return (
			<div
				style={{
					height: '100%',
					width: '100%',
					overflow: 'auto',
					padding: '3rem',
					backgroundColor: 'rgba(145, 209, 237, 0.1)',
				}}
			>	
				<ThemeProvider>
					<Story {...context} />
				</ThemeProvider>
			</div>
		);
	},
];
