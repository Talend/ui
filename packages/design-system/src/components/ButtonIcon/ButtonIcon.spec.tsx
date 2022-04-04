import React from 'react';

import { ButtonIconToggle } from '.';

context('<ButtonToggle />', () => {
	it('should not have aria-pressed if not active', () => {
		cy.mount(
			<ButtonIconToggle icon="talend-abc" isActive={false} onClick={() => {}}>
				Toggle me
			</ButtonIconToggle>,
		);
		cy.get('button').should('have.attr', 'aria-pressed', 'false');
	});

	it('should have aria-pressed if active', () => {
		cy.mount(
			<ButtonIconToggle icon="talend-abc" isActive onClick={() => {}}>
				Toggle me
			</ButtonIconToggle>,
		);
		cy.get('button').should('have.attr', 'aria-pressed', 'true');
	});
});
