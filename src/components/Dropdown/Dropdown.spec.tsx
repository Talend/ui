/// <reference types="cypress" />

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Dropdown.stories';

const { WithIcons, WithDividers } = composeStories(Stories);

context('<Dropdown />', () => {
	it('should render', () => {
		cy.mount(<WithIcons />);
		cy.getByTest('dropdown.button').should('be.visible');
	});

	it('should display menu', () => {
		cy.mount(<WithIcons />);
		cy.getByTest('dropdown.button').click();
		cy.getByTest('dropdown.menu').should('be.visible');
		cy.getByTest('dropdown.menuitem').should('have.length', 3);
		cy.clickOutside();
		cy.getByTest('dropdown.menu').should('not.be.visible');
	});

	it('should display menu with keyboard', () => {
		cy.mount(<WithIcons />);
		cy.getByTest('dropdown.button').type(' ');
		cy.getByTest('dropdown.menu').should('be.visible');
		cy.getByTest('dropdown.button').type('{esc}');
		cy.getByTest('dropdown.menu').should('not.be.visible');
	});

	it('should navigate through the menu with keyboard', () => {
		cy.mount(<WithIcons />);
		cy.getByTest('dropdown.button').click();
		cy.getByTest('dropdown.menu').should('be.visible');
		// Let's highlight the second menu item
		cy.get('body').type('{downArrow}{downArrow}');
		// And verify that's focused
		cy.getByTest('dropdown.menuitem').eq(1).should('be.attr', 'tabindex', 0);
	});

	it('should have separators', () => {
		cy.mount(<WithDividers />);
		cy.getByTest('dropdown.button').click();
		cy.getByTest('dropdown.menu')
			.should('be.visible')
			.within(() => {
				cy.getByRole('separator').should('have.length', 2);
			});
	});

	it('should have menu item with external links', () => {
		cy.mount(<WithDividers />);
		cy.getByTest('dropdown.button').click();
		cy.getByTest('dropdown.menuitem')
			.first()
			.should('be.visible')
			.within(() => {
				cy.get('.link__icon--external').should('be.visible');
			});
	});
});
