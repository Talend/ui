import React from 'react';
import { mount } from '@cypress/react';
import { setGlobalConfig } from '@storybook/testing-react';
import * as globalStorybookConfig from '../../.storybook/preview'; // path of your preview.js file

setGlobalConfig(globalStorybookConfig);

Cypress.Commands.add('mount', jsx => {
	return mount(jsx);
});

Cypress.Commands.add('clickOutside', () => {
	return cy.get('body').click(0, 0);
});

Cypress.Commands.add('getByTestId', (selector, ...args) => {
	return cy.get(`[data-testid="${selector}"]`, ...args);
});

Cypress.Commands.add('getByTest', (selector, ...args) => {
	return cy.get(`[data-test="${selector}"]`, ...args);
});

Cypress.Commands.add('getByRole', (selector, ...args) => {
	return cy.get(`[role="${selector}"]`, ...args);
});
