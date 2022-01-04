/// <reference types="cypress" />

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import Button from '.';
import * as Stories from './Button.stories';

const { Loading } = composeStories(Stories);

context('<Button />', () => {
	describe('default state', () => {
		it('should be focusable', () => {
			cy.mount(<Button>button</Button>);
			cy.get('.btn').focus();
		});
	});

	describe('loading state', () => {
		it('should load', () => {
			cy.mount(<Loading />);
			cy.get('.btn')
				.should('have.attr', 'aria-busy', 'false')
				.click()
				.should('have.attr', 'aria-busy', 'true');
			cy.get('.btn').should('have.attr', 'aria-busy', 'false');
		});

		it('should have a tooltip', () => {
			cy.mount(<Loading />);
			cy.get('.btn')
				.focus()
				.should('have.attr', 'aria-describedby')
				.then(describedBy =>
					cy.get(`#${describedBy}`).should('have.text', 'Relevant description of the basic button'),
				);
		});
	});
});
