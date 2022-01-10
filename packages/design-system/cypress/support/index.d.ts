/// <reference types="cypress" />

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
			getByTestId(
				dataTestId: string,
				options?: Partial<Loggable & Timeoutable & Withinable>,
			): Chainable<Element>;

			/**
			 * Get one or more DOM elements by data-test attribute
			 */
			getByTest(
				dataTest: string,
				options?: Partial<Loggable & Timeoutable & Withinable>,
			): Chainable<Element>;

			/**
			 * Get one or more DOM elements by aria-role attribute
			 */
			getByRole(
				role: string,
				options?: Partial<Loggable & Timeoutable & Withinable>,
			): Chainable<Element>;
		}
	}
}
