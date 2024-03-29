/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-queries */
import Step from './index';

context('<Step />', () => {
	describe('default', () => {
		it('should show a tooltip', () => {
			cy.mount(<Step.Disabled tooltip="Here is why" title="Step label" data-testid="step" />);

			cy.findByTestId('step').trigger('mouseenter');

			cy.findByRole('tooltip').should('be.visible').should('have.text', 'Here is why');
		});
	});
});
