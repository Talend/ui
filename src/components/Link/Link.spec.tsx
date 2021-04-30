/// <reference types="cypress" />

import React from 'react';

import Link from './';

context('<Link />', () => {
	it('should render', () => {
		cy.mount(
			<Link iconBefore="information" href="https://help.talend.com">
				Help
			</Link>,
		);
		cy.get('.link').should('have.attr', 'title', 'Open in a new tab').should('contain', 'Help');
	});
});
