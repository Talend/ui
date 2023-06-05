/* eslint-disable @talend/import-depth */
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { namespaces as designSystemNamespaces } from '@talend/locales-design-system/namespaces';
import { locales as designSystemLocales } from '@talend/locales-design-system/locales';

i18n.use(initReactI18next).init({
	debug: false,
	defaultNS: designSystemNamespaces[0],
	fallbackLng: 'en',
	fallbackNS: designSystemNamespaces,
	interpolation: {
		escapeValue: false,
	},
	ns: designSystemNamespaces,
	resources: Object.keys(designSystemLocales).reduce(
		(resources, language) => ({
			...resources,
			[language]: {
				...designSystemLocales[language],
			},
		}),
		{},
	),
	wait: true,
});
