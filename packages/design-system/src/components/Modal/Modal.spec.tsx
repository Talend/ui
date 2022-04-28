import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Modal.stories';

const { Basic, WithNonClosingBackdrop } = composeStories(Stories);

context('<Modal />', () => {
	it('should render', () => {
		cy.mount(<Basic />);
		cy.getByTest('open-modal').click();
		cy.getByTest('modal').should('be.visible');
	});

	it('should close the modal on cancel/close action', () => {
		// when
		cy.mount(<Basic />);
		cy.getByTest('open-modal').click();
		cy.getByTest('modal.buttons.close')
			.click()
			.then(() => {
				// then
				cy.getByTest('modal').should('not.exist');
			});
	});

	it('should close the modal on ESC key', () => {
		// when
		cy.mount(<Basic />);
		cy.getByTest('open-modal').click();
		cy.getByTest('modal')
			.type('{esc}')
			.then(() => {
				// then
				cy.getByTest('modal').should('not.exist');
			});
	});

	it('should not close the modal on ESC key', () => {
		// when
		cy.mount(<WithNonClosingBackdrop />);
		cy.getByTest('open-modal').click();
		cy.getByTest('modal')
			.type('{esc}')
			.then(() => {
				// then
				cy.getByTest('modal').should('exist');
			});
	});
});
