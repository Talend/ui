import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Modal.stories';

const { Basic, WithNonClosingBackdrop } = composeStories(Stories);

context('<Modal />', () => {
	it('should render', () => {
		cy.mount(<Basic />);
		cy.getByTest('modal').should('be.visible');
	});

	it('should close the modal on cancel/close action', () => {
		// given
		const onCloseStub = cy.stub();

		// when
		cy.mount(<Basic onClose={onCloseStub} />);
		cy.getByTest('modal.buttons.close')
			.click()
			.then(() => {
				// then
				expect(onCloseStub).to.have.been.called;
			});
	});

	it('should close the modal on ESC key', () => {
		// given
		const onCloseStub = cy.stub();

		// when
		cy.mount(<Basic onClose={onCloseStub} />);
		cy.getByTest('modal')
			.type('{esc}')
			.then(() => {
				// then
				expect(onCloseStub).to.be.called;
			});
	});

	it('should not close the modal on cancel/close action or ESC key', () => {
		// given
		const onCloseStub = cy.stub();

		// when
		cy.mount(<WithNonClosingBackdrop onClose={onCloseStub} />);
		cy.getByTest('modal.buttons.close').click();
		cy.getByTest('modal').type('{esc}');

		// then
		expect(onCloseStub).not.to.be.called;
	});
});
