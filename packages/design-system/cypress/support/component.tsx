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
import React from 'react';
// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
import '@testing-library/cypress/add-commands';
import { mount } from 'cypress/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import IconsProvider from '../../src/components/IconsProvider';
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
// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

Cypress.Commands.add('mount', (component, options) => {
	// const wrapped = (
	// 	<React.Fragement>
	// 		<IconsProvider />
	// 		{component}
	// 	</React.Fragement>
	// );
	const wrapper = component;
	return mount(wrapper, options);
});

// Example use:
// cy.mount(<MyComponent />)
