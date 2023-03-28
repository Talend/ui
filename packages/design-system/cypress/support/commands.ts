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

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import '@testing-library/cypress/add-commands';
