/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';

import { LinkAsButton } from './';

context('<LinkAsButton />', () => {
	it('should render', () => {
		cy.mount(<LinkAsButton data-testid="my.link">Link example</LinkAsButton>);
		cy.findByTestId('my.link').should('have.text', 'Link example');
	});

	it('should render icon before', () => {
		cy.mount(<LinkAsButton icon="information-filled">Link example</LinkAsButton>);
		cy.findByTest('link.icon.before').should('be.visible');
	});

	it('should render external', () => {
		cy.mount(<LinkAsButton openInNewTab>Link example</LinkAsButton>);
		cy.findByTest('link.icon.external').should('be.visible');
	});
});
