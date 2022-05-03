import React from 'react';
import Tooltip from './Tooltip';

context('<Tooltip />', () => {
	describe('default', () => {
		it('should show a tooltip', () => {
			cy.mount(
				<Tooltip title="hover me" role="tooltip">
					<button>button</button>
				</Tooltip>,
			);

			cy.getByRole('tooltip').should('not.be.visible');
			cy.get('button').click();
			cy.getByRole('tooltip').should('be.visible');
		});

		it('Should be able to override baseId', () => {
			const tooltipBaseId = 'base-id';
			cy.mount(
				<Tooltip title="hover me" role="tooltip" baseId={tooltipBaseId}>
					<button>button</button>
				</Tooltip>,
			);

			cy.getByRole('tooltip').invoke('attr', 'id').should('eq', tooltipBaseId);
		});
	});
});
