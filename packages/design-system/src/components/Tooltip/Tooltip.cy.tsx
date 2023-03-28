/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
import React from 'react';
import Tooltip from './Tooltip';

context('<Tooltip />', () => {
	describe('default', () => {
		it('should show a tooltip', () => {
			cy.mount(
				<Tooltip title="click me" data-testid="my.tooltip">
					<button>button</button>
				</Tooltip>,
			);

			cy.findByTestId('my.tooltip').should('not.be.visible');
			cy.get('button').click();
			cy.findByTestId('my.tooltip').should('be.visible');
		});

		it('Should be able to override baseId', () => {
			const tooltipBaseId = 'base-id';
			cy.mount(
				<Tooltip title="click me" data-testid="my.tooltip" baseId={tooltipBaseId}>
					<button>button</button>
				</Tooltip>,
			);

			cy.findByTestId('my.tooltip').invoke('attr', 'id').should('eq', tooltipBaseId);
		});
	});
});
