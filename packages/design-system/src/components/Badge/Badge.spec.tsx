import React from 'react';

import { BadgeDropdown, BadgePopover, BadgeTag, BadgeValue } from '.';

/* eslint-disable testing-library/prefer-screen-queries */

context('<Badge />', () => {
	const label = 'Delightful';
	const items = [
		{ id: '1', label: 'Component', onClick: () => {} },
		{ id: '2', label: 'Item', onClick: () => {} },
	];

	it('should render BadgeTag', () => {
		cy.mount(<BadgeTag label={label} />);

		cy.getByTestId('badge-label').should('have.text', label);
	});

	it('should render BadgeValue', () => {
		cy.mount(<BadgeValue label={label} value={items.map(v => v.label)} />);

		cy.getByTestId('badge-label').should('have.text', label);
		cy.getByTestId('badge-divider');

		items.map(v => v.label).forEach(v => cy.getByTestId(`badgevalue-${v}`).should('have.text', v));
	});

	it('should render BadgeDropdown', () => {
		cy.mount(<BadgeDropdown label={label} selectedId="2" value={items} />);

		cy.getByTestId('badge-label').should('have.text', label);
		cy.getByTestId('badge-divider');

		cy.getByTest('dropdown.button.badge-button').should('have.text', 'Item');
	});

	it('should render BadgePopover', () => {
		cy.mount(<BadgePopover label={label} value={items} />);

		cy.getByTestId('badge-label').should('have.text', label);
		cy.getByTestId('badge-divider');

		items.forEach(v => cy.getByTest(`${v.id}.badge-button`).should('have.text', v.label));
	});
});
