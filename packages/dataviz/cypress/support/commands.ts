/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="cypress" />

import { mount } from 'cypress/react';
declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to select DOM element by data-cy attribute.
			 * @example cy.dataCy('greeting')
			 */
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add('mount', (component, options) => {
	const wrapper = component;
	return mount(wrapper, options);
});

import '@testing-library/cypress/add-commands';
