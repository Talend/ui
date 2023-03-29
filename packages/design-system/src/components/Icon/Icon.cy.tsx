/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-utils */
import React from 'react';

import { Icon } from '.';

describe('Icon', () => {
	it('should render from svg', () => {
		cy.mount(<Icon name="svg-dd" />);
		cy.get('svg').should('to.exist');
	});
	it('should render from src', () => {
		cy.mount(<Icon name="src-/foo/bar.png" />);
		cy.get('img').should('to.exist');
	});

	it('should render with provided className', () => {
		cy.mount(<Icon name="svg-dd" className="custom-class" />);
		cy.get('svg').should('to.exist').should('have.class', 'custom-class');
	});

	it('should support extra props', () => {
		cy.mount(<Icon name="svg-dd" className="custom-class" data-custom="hello" />);
		cy.get('svg').should('to.exist').should('have.attr', 'data-custom', 'hello');
	});

	it('should support remote svg', () => {
		cy.intercept('/assets/icons/my-icon.svg', '<svg data-testid="myicon"></svg>').as(
			'getRemoteIcon',
		);
		cy.mount(<Icon name="remote-/assets/icons/my-icon.svg" />);
		cy.findByTestId('myicon').should('not.to.exist');
		cy.wait('@getRemoteIcon');
		cy.findByTestId('myicon').should('to.exist');
	});
});
