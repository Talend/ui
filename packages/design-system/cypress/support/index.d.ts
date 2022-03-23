import React from 'react';
import { MountReturn } from '@cypress/react';

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Mount story using Theme Provider
			 */
			mount(jsx: React.ReactNodes): Chainable<MountReturn>;

			/**
			 * Click outside means clicking on the body at x=0 and y=0
			 */
			clickOutside(): Chainable<Element>;

			/**
			 * Get one or more DOM elements by data-testid attribute
			 */
			getByTestId(selector: string, options?: Partial<TypeOptions>): Chainable<Element>;

			/**
			 * Get one or more DOM elements by data-test attribute
			 */
			getByTest(selector: string, options?: Partial<TypeOptions>): Chainable<Element>;

			/**
			 * Get one or more DOM elements by aria-role attribute
			 */
			getByRole(selector: string, options?: Partial<TypeOptions>): Chainable<Element>;
		}
	}
}
