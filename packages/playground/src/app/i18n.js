/* eslint-disable import/no-extraneous-dependencies */
import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';

import { locales as tuiComponentsLocales } from '@talend/locales-tui-components/locales.js';
import { namespaces as tuiComponentsNamespaces } from '@talend/locales-tui-components/namespaces.js';
import { locales as tuiContainersLocales } from '@talend/locales-tui-containers/locales.js';
import { namespaces as tuiContainersNamespaces } from '@talend/locales-tui-containers/namespaces.js';
import { locales as tuiFormsLocales } from '@talend/locales-tui-forms/locales.js';
import { namespaces as tuiFormsNamespaces } from '@talend/locales-tui-forms/namespaces.js';
import { locales as tuiFacetedSearchLocales } from '@talend/locales-tui-faceted-search/locales.js';

const resources = Object.keys(tuiComponentsLocales).reduce((acc, language) => {
	acc[language] = {
		...tuiComponentsLocales[language],
		...tuiContainersLocales[language],
		...tuiFormsLocales[language],
		...tuiFacetedSearchLocales[language],
	};
	return acc;
}, {});

export function initI18n() {
	i18next.use(initReactI18next).init({
		fallbackLng: 'en',
		lng: 'fr',
		resources,
		ns: [...tuiComponentsNamespaces, ...tuiContainersNamespaces, ...tuiFormsNamespaces],
		react: {
			useSuspense: false,
		},
		interpolation: {
			escapeValue: false,
		},
		defaultNS: 'talend-ui-playground',
	});
}
