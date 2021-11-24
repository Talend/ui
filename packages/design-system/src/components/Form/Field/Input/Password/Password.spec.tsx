/// <reference types="cypress" />

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Password.stories';

const { Default, Filled } = composeStories(Stories);

context('<Form.Password />', () => {
	it('should render', () => {
		cy.mount(<Default />);
		cy.get('input').should('have.attr', 'type', 'password');
	});

	it('should reveal value', () => {
		cy.mount(<Default />);
		cy.get('input').should('have.attr', 'type', 'password');
		cy.get('button').click();
		cy.get('input').should('have.attr', 'type', 'text').should('be.focused');
	});

	it('should hide value on blur', () => {
		cy.mount(<Filled />);
		cy.get('input').should('have.attr', 'type', 'password');
		cy.get('button').click();
		cy.get('input').blur();
		cy.get('input').should('have.attr', 'type', 'password');
	});
});
