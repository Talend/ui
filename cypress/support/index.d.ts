/// <reference types="cypress" />

import React from 'react';
import { MountReturn } from '@cypress/react';

declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * Mount story using Theme Provider
		 */
		mount(jsx: React.ReactNodes): Chainable<MountReturn>;

		/**
		 * Click outside means clicking on the body at x=0 and y=0
		 */
		clickOutside(): Chainable<any>;

		/**
		 * Get one or more DOM elements by data-testid attribute
		 */
		getByTestId(
			dataTestId: string,
			options?: Partial<Loggable & Timeoutable & Withinable>,
		): Chainable<any>;

		/**
		 * Get one or more DOM elements by data-test attribute
		 */
		getByTest(
			dataTest: string,
			options?: Partial<Loggable & Timeoutable & Withinable>,
		): Chainable<any>;

		/**
		 * Get one or more DOM elements by aria-role attribute
		 */
		getByRole(role: string, options?: Partial<Loggable & Timeoutable & Withinable>): Chainable<any>;
	}
}
