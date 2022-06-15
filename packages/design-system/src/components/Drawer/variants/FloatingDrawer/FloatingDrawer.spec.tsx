import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './FloatingDrawer.stories';

const { Simple, WithDisclosure, WithControlledVisibility } = composeStories(Stories);

context('<FloatingDrawer />', () => {
	it('should render', () => {
		cy.mount(<Simple />);
		cy.getByTest('drawer').should('be.visible');
	});

	it('should support custom disclosure', () => {
		cy.mount(<WithDisclosure />);
		cy.getByTest('drawer-disclosure').click();
		cy.getByTest('drawer').should('be.visible');
	});

	it('should support controlled visible props', () => {
		cy.mount(<WithControlledVisibility />);
		cy.getByTest('drawer-disclosure').click();
		cy.getByTest('drawer').should('be.visible');
	});

	it('should close the drawer', () => {
		cy.mount(<WithDisclosure />);
		cy.getByTest('drawer-disclosure').click();
		cy.getByTest('drawer').should('be.visible');
		cy.getByTest('drawer-disclosure').click();
		cy.getByTest('drawer').should('not.be.visible');
	});

	it('should close the modal on ESC key', () => {
		// when
		cy.mount(<WithDisclosure />);
		cy.getByTest('drawer-disclosure').click();
		cy.getByTest('drawer').should('be.visible');
		cy.getByTest('drawer')
			.type('{esc}')
			.then(() => {
				// then
				cy.getByTest('drawer').should('not.be.visible');
			});
	});
});
