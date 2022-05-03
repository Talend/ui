import React from 'react';
import Tooltip from './Tooltip';

const expectUUID = (value: string, match: boolean = true) => {
	let assertion = expect(value);
	if (!match) {
		assertion = assertion.not;
	}
	assertion.to.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
};

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
		it('Should use uuid as tooltip id', () => {
			cy.mount(
				<Tooltip title="hover me" role="tooltip">
					<button>button</button>
				</Tooltip>,
			);

			cy.getByRole('tooltip')
				.invoke('attr', 'id')
				.then(id => {
					expectUUID(id);
					cy.get('button').invoke('attr', 'aria-describedby').should('eq', id);
				});
		});

		it('Should be able to override baseId', () => {
			const tooltipBaseId = 'base-id';
			cy.mount(
				<Tooltip title="hover me" role="tooltip" baseId={tooltipBaseId}>
					<button>button</button>
				</Tooltip>,
			);

			cy.getByRole('tooltip')
				.invoke('attr', 'id')
				.should('eq', tooltipBaseId)
				.then(id => expectUUID(id, false));
		});
	});
});
