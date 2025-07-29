/* eslint-disable testing-library/prefer-screen-queries */

/* eslint-disable testing-library/await-async-queries */
import { useState } from 'react';

import { ButtonPrimary, CollapsiblePanel, Popover } from '../../';

context('<Popover />', () => {
	describe('default', () => {
		it('should show a popover', () => {
			cy.mount(
				<Popover
					data-testid="my.popover"
					disclosure={<ButtonPrimary data-testid="my.button">Open popover</ButtonPrimary>}
				>
					<p>Popover content</p>
				</Popover>,
			);

			cy.findByTestId('my.button').should('be.visible');
			cy.findByTestId('my.popover').should('not.be.visible');
			cy.findByTestId('my.button').click();
			cy.findByTestId('my.popover').should('be.visible');
		});

		it('should prevent default without controlled state', () => {
			cy.mount(
				<CollapsiblePanel
					title="panel"
					metadata={[
						<Popover
							key="my.popover"
							placement="left"
							data-testid="my.popover"
							disclosure={<ButtonPrimary data-testid="my.button">Open popover</ButtonPrimary>}
						>
							<p>Popover content</p>
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
			cy.findByTestId('my.popover').should('be.visible');
		});

		it('should prevent default with controlled state', () => {
			const PopoverWithControlledState = () => {
				const [open, setOpen] = useState(false);
				return (
					<CollapsiblePanel
						title="panel"
						metadata={[
							<Popover
								key="my.popover"
								data-testid="my.popover"
								placement="left"
								open={open}
								onOpenChange={setOpen}
								disclosure={
									<ButtonPrimary
										onClick={event => {
											event.preventDefault();
											event.stopPropagation();
											setOpen(!open);
										}}
										data-testid="my.button"
									>
										Open popover
									</ButtonPrimary>
								}
							>
								<p>Popover content</p>
							</Popover>,
						]}
					>
						Some text
					</CollapsiblePanel>
				);
			};

			cy.mount(<PopoverWithControlledState />);

			// Disclosure onClick should stop propagation and not open the CollapsiblePanel container
			cy.findByTestId('panel.section').should('not.exist');
			cy.findByTestId('my.button').click();
			cy.findByTestId('panel.section').should('not.exist');
			cy.findByTestId('my.popover').should('be.visible');
		});
	});
});
