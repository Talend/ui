import { mount } from '@cypress/react';
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

Cypress.Commands.add('mount', jsx => {
	return mount(jsx);
});

Cypress.Commands.add('clickOutside', () => {
	cy.get('body').click(0, 0);
});

Cypress.Commands.add('getByTestId', (selector, options) => {
	return cy.get(`[data-testid="${selector}"]`, options);
});

Cypress.Commands.add('getByTest', (selector, options) => {
	return cy.get(`[data-test="${selector}"]`, options);
});

Cypress.Commands.add('getByRole', (selector, options) => {
	return cy.get(`[role="${selector}"]`, options);
});
