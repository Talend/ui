/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="cypress" />

import { mount } from 'cypress/react';
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add('mount', (component, options) => {
	const wrapper = component;
	return mount(wrapper, options);
});

import '@testing-library/cypress/add-commands';
