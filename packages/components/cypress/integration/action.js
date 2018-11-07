/* global context, cy */
context('Actions', () => {
	beforeEach(() => {
		cy.visit(
			'/iframe.html?selectedKind=Action&selectedStory=Disable%20the%20buttons&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel',
		);
	});

	it('should active/inactive a button', () => {
		cy.contains('Action 2').should('not.be.disabled');
		cy.contains('Action 1').should('be.disabled');

		cy.contains('Action 2').focus();
		cy.contains('Action 2').trigger('mouseover');
		cy.contains('tooltip Action 2');

		cy.contains('Action 2').click();
		cy.contains('Action 1').should('not.be.disabled');
		cy.contains('Action 2').should('be.disabled');

		cy.contains('Action 1').focus();
		cy.contains('Action 1').click();
		cy.contains('Action 2').should('not.be.disabled');
		cy.contains('Action 1').should('be.disabled');
	});
});
