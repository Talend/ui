import React from 'react';
import { composeStories } from '@storybook/testing-react';

import ButtonPrimitive from './Primitive/ButtonPrimitive';
import * as Stories from './Button.stories';

const { Loading } = composeStories(Stories);

context('<Button />', () => {
	describe('default', () => {
		it('should be focusable', () => {
			cy.mount(<ButtonPrimitive onClick={() => {}}>button</ButtonPrimitive>);
			cy.get('button').focus();
		});
		it('should accept data-feature', () => {
			cy.mount(<ButtonPrimitive data-testid="my.button" data-feature="my.feature" onClick={() => {}}>button</ButtonPrimitive>);
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
			cy.get('button').should('have.attr', 'aria-busy', 'false');
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
