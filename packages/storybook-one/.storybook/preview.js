import React from 'react';

import {
	namespaces as designSystemNamespaces,
	locales as designSystemLocales,
} from '@talend/locales-design-system';
import {
	namespaces as tuiComponentsNamespaces,
	locales as tuiComponentsLocales,
} from '@talend/locales-tui-components';
import {
	namespaces as tuiContainersNamespaces,
	locales as tuiContainersLocales,
} from '@talend/locales-tui-containers';
import {
	namespaces as tuiFacetedSearchNamespaces,
	locales as tuiFacetedSearchLocales,
} from '@talend/locales-tui-faceted-search';
import {
	namespaces as tuiFormsNamespaces,
	locales as tuiFormsLocales,
} from '@talend/locales-tui-forms';

export const i18n = {
	namespaces: [
		...designSystemNamespaces,
		...tuiComponentsNamespaces,
		...tuiContainersNamespaces,
		...tuiFormsNamespaces,
		...tuiFacetedSearchNamespaces,
	],
	locales: Object.keys(designSystemLocales).reduce(
		(resources, language) => ({
			...resources,
			[language]: {
				...designSystemLocales[language],
				...tuiComponentsLocales[language],
				...tuiContainersLocales[language],
				...tuiFacetedSearchLocales[language],
				...tuiFormsLocales[language],
			},
		}),
		{},
	),
};

export const parameters = {};
