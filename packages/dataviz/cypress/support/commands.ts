/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';
import { mount } from 'cypress/react';

Cypress.Commands.add('mount', (component, options) => {
	const wrapper = component;
	return mount(wrapper, options);
});
