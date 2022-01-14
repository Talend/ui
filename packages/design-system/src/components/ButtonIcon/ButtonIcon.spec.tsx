/// <reference types="cypress" />
import React from 'react';

import { ButtonToggle } from '.';

context('<ButtonToggle />', () => {
	it('should not have aria-pressed if not active', () => {
		cy.mount(
			<ButtonToggle icon="talend-abc" isActive={false} onClick={() => {}}>
				Toggle me
			</ButtonToggle>,
		);
		cy.get('button').should('have.attr', 'aria-pressed', 'false');
	});

	it('should have aria-pressed if active', () => {
		cy.mount(
			<ButtonToggle icon="talend-abc" isActive onClick={() => {}}>
				Toggle me
			</ButtonToggle>,
		);
		cy.get('button').should('have.attr', 'aria-pressed', 'true');
	});
});
