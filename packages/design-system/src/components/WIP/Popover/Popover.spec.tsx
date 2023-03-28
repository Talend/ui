import React from 'react';
import Popover from './Popover';
import { ButtonPrimary, CollapsiblePanel } from '../../..';

context('<Popover />', () => {
	describe('default', () => {
		it('should show a popover', () => {
			cy.mount(
				<Popover
					disclosure={<ButtonPrimary data-test="my.button">Open popover</ButtonPrimary>}
					data-test="my.popover"
				>
					Popover content
				</Popover>,
			);

			cy.findByTestId('my.button').should('be.visible');
			cy.findByTestId('my.popover').should('not.be.visible');
			cy.findByTestId('my.button').click();
			cy.findByTestId('my.popover').should('be.visible');
		});

		it('should be able to override disclosure click', () => {
			cy.mount(
				<CollapsiblePanel
					title="panel"
					metadata={[
						<Popover
							key="my.popover"
							disclosure={
								<ButtonPrimary onClick={event => event.stopPropagation()} data-test="my.button">
									Open popover
								</ButtonPrimary>
							}
							data-test="my.popover"
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
		});
	});
});
