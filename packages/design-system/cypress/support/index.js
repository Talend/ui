import { mount } from '@cypress/react';
import { setGlobalConfig } from '@storybook/testing-react';

import * as globalStorybookConfig from '../../.storybook/preview';

setGlobalConfig(globalStorybookConfig);

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
