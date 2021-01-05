/// <reference types="cypress" />

context('<Toggle />', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=components-toggle--usage');
	});

	it('should toggle', () => {
		cy.get('.btn')
			.should('have.attr', 'aria-pressed', 'false')
			.click()
			.should('have.attr', 'aria-pressed', 'true')
			.click()
			.should('have.attr', 'aria-pressed', 'false');
	});
});
