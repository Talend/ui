/// <reference types="cypress" />

import React from 'react';

import Tag from './';

context('<Tag />', () => {
	it('should render', () => {
		cy.mount(<Tag>Lorem ipsum</Tag>);
		cy.get('.tag').should('have.text', 'Lorem ipsum');
	});
});
