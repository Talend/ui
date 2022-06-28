import React from 'react';
import Tooltip from './Tooltip';

context('<Tooltip />', () => {
	describe('default', () => {
		it('should show a tooltip', () => {
			cy.mount(
				<Tooltip title="click me" data-test="my.tooltip">
					<button>button</button>
				</Tooltip>,
			);

			cy.getByTest('my.tooltip').should('not.be.visible');
			cy.get('button').click();
			cy.getByTest('my.tooltip').should('be.visible');
		});

		it('Should be able to override baseId', () => {
			const tooltipBaseId = 'base-id';
			cy.mount(
				<Tooltip title="click me" data-test="my.tooltip" baseId={tooltipBaseId}>
					<button>button</button>
				</Tooltip>,
			);

			cy.getByTest('my.tooltip').invoke('attr', 'id').should('eq', tooltipBaseId);
		});
	});
});
