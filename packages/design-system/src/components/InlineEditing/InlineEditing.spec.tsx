/// <reference types="cypress" />

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './InlineEditing.stories';

const { Default, Textarea } = composeStories(Stories);

context('<InlineEditing />', () => {
	it('should go to edit mode when clicking on the button', () => {
		cy.mount(<Default />);
		cy.getByTestId('inlineediting.button.edit').click();
		cy.getByTestId('ìnlineediting.input').should('exist').should('have.attr', 'type', 'text');
	});

	it('should go to edit mode when double clicking on the span', () => {
		cy.mount(<Default />);
		cy.getByTestId('inlineediting').dblclick();
		cy.getByTestId('ìnlineediting.input').should('exist').should('have.attr', 'type', 'text');
	});

	it('should render Textarea', () => {
		cy.mount(<Textarea />);
		cy.getByTestId('inlineediting.button.edit').click();
		cy.getByTestId('ìnlineediting.textarea').should('exist');
	});

	it('should restore value on Esc', () => {
		cy.mount(<Default />);
		cy.getByTestId('inlineediting.button.edit').click();
		cy.getByTestId('ìnlineediting.input')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{esc}');
		cy.getByTestId('inlineediting').contains('Lorem ipsum dolor sit amet');
	});

	it('should validate on Enter', () => {
		cy.mount(<Default />);
		cy.getByTestId('inlineediting.button.edit').click();
		cy.getByTestId('ìnlineediting.input')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{enter}');
		cy.getByTestId('inlineediting').contains('blah');
	});

	it('should not validate on Enter when multiline', () => {
		cy.mount(<Textarea />);
		cy.getByTestId('inlineediting.button.edit').click();
		cy.getByTestId('ìnlineediting.textarea')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{enter}');
		cy.getByTestId('ìnlineediting.textarea').should('exist');
	});
});
