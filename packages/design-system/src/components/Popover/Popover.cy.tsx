/* eslint-disable testing-library/prefer-screen-queries */

/* eslint-disable testing-library/await-async-query */
import { Popover, ButtonPrimary, CollapsiblePanel } from '../../';

context('<Popover />', () => {
	describe('default', () => {
		it('should show a popover', () => {
			cy.mount(
				<Popover data-testid="my.popover" popup="Popover content">
					<ButtonPrimary data-testid="my.button">Open popover</ButtonPrimary>
				</Popover>,
			);

			cy.findByTestId('my.button').should('be.visible');
			cy.findByTestId('my.popover').should('not.be.visible');
			cy.findByTestId('my.button').click();
			cy.findByTestId('my.popover').should('be.visible');
		});

		it('should prevent default', () => {
			cy.mount(
				<CollapsiblePanel
					title="panel"
					metadata={[
						<Popover key="my.popover" data-testid="my.popover" popup={<p>Popover content</p>}>
							<ButtonPrimary onClick={() => {}} data-testid="my.button">
								Open popover
							</ButtonPrimary>
						</Popover>,
					]}
				>
					Some text
				</CollapsiblePanel>,
			);

			// Disclosure onClick should stop propagation and not open the CollapsiblePanel container
			cy.findByTestId('panel.section').should('not.exist');
			cy.findByTestId('my.button').click();
			cy.findByTestId('panel.section').should('not.exist');
		});
	});
});
