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
		 * Get one or more DOM elements by data-testid attribute
		 */
		getByTestId(
			dataTestId: string,
			options?: Partial<Loggable & Timeoutable & Withinable>,
		): Chainable<any>;
	}
}
