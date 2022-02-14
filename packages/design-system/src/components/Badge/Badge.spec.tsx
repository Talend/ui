import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Badge.stories';

const { SimpleBadge, SimpleBadges, NotRemovableBadge, NotRemovableBadges } =
	composeStories(Stories);

context('<Badge />', () => {
	it('should render', () => {
		cy.mount(<SimpleBadge />);
		cy.getByTest('badge.label').should('have.text', 'Lorem ipsum');
	});

	it('should be removed', () => {
		cy.mount(<SimpleBadges />);
		cy.getByTest('badge.remove').should('have.length', 2);
		cy.getByTest('badge.remove').first().click();
		cy.getByTest('badge.remove').should('have.length', 1);
	});

	it('should display dropdown menu', () => {
		cy.mount(<NotRemovableBadge />);
		cy.getByTest('badge.dropdown').click();
		cy.getByTest('badge.dropdown').should('have.attr', 'aria-expanded', 'true');
		cy.getByTest('badge.dropdown').getByRole('menuitem').should('have.length', 3);
	});

	it('should update its value by picking dropdown menuitem', () => {
		cy.mount(<NotRemovableBadges />);
		cy.get('em').should('contain.text', 'Production');
		cy.getByTest('badge.dropdown').contains('Production').click();
		cy.getByTest('badge.dropdown').getByRole('menuitem').contains('Staging').click();
		cy.getByTest('badge.dropdown').contains('Staging').should('to.exist');
		cy.get('em').should('contain.text', 'Staging');
	});
});
