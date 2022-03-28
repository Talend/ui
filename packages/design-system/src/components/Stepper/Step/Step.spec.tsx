import React from 'react';
import Step from './index';

context('<Step />', () => {
	describe('default', () => {
		it('should show a tooltip', () => {
			cy.mount(<Step.Disabled tooltip="Here is why" title="Step label" data-testid="step" />);

			cy.getByTestId('step').trigger('mouseover');

			cy.getByRole('tooltip').should('be.visible').should('have.text', 'Here is why');
		});
	});
});
