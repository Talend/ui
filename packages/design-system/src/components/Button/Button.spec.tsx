import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Button.stories';

const { Primary, Loading } = composeStories(Stories);

context('<Button />', () => {
	describe('default', () => {
		it('should be focusable', () => {
			cy.mount(<Primary data-testid="my.button" />);
			cy.getByTestId('my.button').focus();
		});
		it('should accept data-feature', () => {
			cy.mount(<Primary data-testid="my.button" data-feature="my.feature" />);
			cy.getByTestId('my.button').should('have.attr', 'data-feature', 'my.feature');
		});
	});

	describe('loading state', () => {
		it('should load', () => {
			cy.mount(<Loading data-testid="my.button" />);
			cy.getByTestId('my.button')
				.should('have.attr', 'aria-busy', 'false')
				.click()
				.should('have.attr', 'aria-busy', 'true');
			cy.get('.btn').should('have.attr', 'aria-busy', 'false');
		});

		it('should have a tooltip', () => {
			cy.mount(<Loading data-testid="my.button" />);
			cy.getByTestId('my.button')
				.focus()
				.should('have.attr', 'aria-describedby')
				.then(describedBy =>
					cy.get(`#${describedBy}`).should('have.text', 'Relevant description of the basic button'),
				);
		});
	});
});
