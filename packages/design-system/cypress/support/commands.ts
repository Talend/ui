/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="cypress" />

import { mount } from 'cypress/react';
// import IconsProvider from '../../src/components/IconsProvider';

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

import '@testing-library/cypress/add-commands';
