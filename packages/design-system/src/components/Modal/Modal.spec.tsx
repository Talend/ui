/* eslint-disable testing-library/prefer-screen-queries */
// => Not relevant because we use Cypress

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Modal.stories';

const { NoDisclosure, WithDisclosure, WithNonClosingBackdrop } = composeStories(Stories);

context('<Modal />', () => {
	it('should render and focus on the modal', () => {
		cy.mount(<NoDisclosure />);
		cy.getByTestId('open-modal').click();
		cy.getByTestId('modal').should('be.visible');
		cy.focused().should('have.attr', 'data-testid', 'modal');
	});

	it('should support custom disclosure', () => {
		cy.mount(<WithDisclosure />);
		cy.getByTestId('modal-disclosure').click();
		cy.getByTestId('modal').should('be.visible');
	});

	it('should close the modal on cancel/close action', () => {
		// when
		cy.mount(<NoDisclosure />);
		cy.getByTestId('open-modal').click();
		cy.getByTestId('modal.buttons.close')
			.click()
			.then(() => {
				// then
				cy.getByTest('modal').should('not.exist');
			});
	});

	it('should close the modal on ESC key', () => {
		// when
		cy.mount(<NoDisclosure />);
		cy.getByTestId('open-modal').click();
		cy.getByTestId('modal')
			.type('{esc}')
			.then(() => {
				// then
				cy.getByTestId('modal').should('not.exist');
			});
	});

	it('should not close the modal on ESC key', () => {
		// when
		cy.mount(<WithNonClosingBackdrop />);
		cy.getByTestId('open-modal').click();
		cy.getByTestId('modal')
			.type('{esc}')
			.then(() => {
				// then
				cy.getByTestId('modal').should('exist');
			});
	});
});
