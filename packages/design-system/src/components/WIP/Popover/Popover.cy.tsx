/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
import React from 'react';
import Popover from './Popover';
import { ButtonPrimary } from '../../Button';
import { CollapsiblePanel } from '../Accordion';

context('<Popover />', () => {
	describe('default', () => {
		it('should show a popover', () => {
			cy.mount(
				<Popover
					disclosure={<ButtonPrimary data-testid="my.button">Open popover</ButtonPrimary>}
					data-testid="my.popover"
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
								<ButtonPrimary onClick={event => event.stopPropagation()} data-testid="my.button">
									Open popover
								</ButtonPrimary>
							}
							data-testid="my.popover"
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
