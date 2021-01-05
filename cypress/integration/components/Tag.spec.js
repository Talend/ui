/// <reference types="cypress" />

context('<Tag />', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=components-tag--usage');
	});

	it('should render', () => {
		cy.get('.tag').should('have.text', 'Lorem ipsum');
	});
});
