/// <reference types="cypress" />

context('<Link />', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=components-link--usage');
	});

	it('should render', () => {
		cy.get('.link').should('have.attr', 'title', 'Open in a new tab').should('contain', 'Help');
	});
});
