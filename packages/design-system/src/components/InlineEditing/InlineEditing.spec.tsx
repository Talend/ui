/// <reference types="cypress" />

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './InlineEditing.stories';

const { Default, Textarea } = composeStories(Stories);

context('<InlineEditing />', () => {
	it('should go to edit mode when clicking on the button', () => {
		cy.mount(<Default />);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.input').should('exist').should('have.attr', 'type', 'text');
	});

	it('should go to edit mode when double clicking on the span', () => {
		cy.mount(<Default />);
		cy.getByTest('inlineediting').dblclick();
		cy.getByTest('inlineediting.input').should('exist').should('have.attr', 'type', 'text');
	});

	it('should render Textarea', () => {
		cy.mount(<Textarea />);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.textarea').should('exist');
	});

	it('should restore value on Esc', () => {
		cy.mount(<Default />);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.input')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{esc}');
		cy.getByTest('inlineediting').contains('Lorem ipsum dolor sit amet');
	});

	it('should validate on Enter', () => {
		cy.mount(<Default />);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.input')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{enter}');
		cy.getByTest('inlineediting').contains('blah');
	});

	it('should not validate on Enter when multiline', () => {
		cy.mount(<Textarea />);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.textarea')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{enter}');
		cy.getByTest('inlineediting.textarea').should('exist');
	});
});
