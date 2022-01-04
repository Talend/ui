/// <reference types="cypress" />

import React from 'react';

import Toggle from '.';

context('<Toggle />', () => {
	it('should toggle', () => {
		cy.mount(<Toggle icon="talend-abc" />);
		cy.get('.btn')
			.should('have.attr', 'aria-pressed', 'false')
			.click()
			.should('have.attr', 'aria-pressed', 'true')
			.click()
			.should('have.attr', 'aria-pressed', 'false');
	});
});
