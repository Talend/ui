/// <reference types="cypress" />
import React from 'react';

import { ButtonToggle } from '.';

context('<ButtonToggle />', () => {
	it('should toggle', () => {
		cy.mount(
			<ButtonToggle icon="talend-abc" isActive={false} onClick={() => ''}>
				Toggle me
			</ButtonToggle>,
		);
		cy.get('button')
			.should('have.attr', 'aria-pressed', 'false')
			.click()
			.should('have.attr', 'aria-pressed', 'true')
			.click()
			.should('have.attr', 'aria-pressed', 'false');
	});
});
