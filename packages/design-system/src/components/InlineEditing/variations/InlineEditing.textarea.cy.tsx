import InlineEditingMulti from './InlineEditing.textarea';

context('<InlineEditing.Textarea />', () => {
	const defaultProps = {
		label: 'Textarea inline edit',
		placeholder: 'Type here',
	};

	it('should render with filled value', () => {
		cy.mount(<InlineEditingMulti {...defaultProps} defaultValue="Some text" />);

		cy.get('[data-testid="inlineediting.button.edit"]').should('exist');
		cy.get('p').should('have.text', 'Some text');
	});

	it('should allow inline editing', () => {
		cy.mount(<InlineEditingMulti {...defaultProps} />);

		// Switch to edit mode
		cy.get('[data-testid="inlineediting.button.edit"]').click();
		cy.get('[data-testid="inlineediting.textarea"]').should('be.visible');
		cy.get('[data-testid="inlineediting.button.cancel"]').should('be.visible');
		cy.get('[data-testid="inlineediting.button.submit"]').should('be.visible');

		// Input some text and submit
		cy.get('[data-testid="inlineediting.textarea"]').type('Here is a description');
		cy.get('[data-testid="inlineediting.button.submit"]').click();

		cy.get('p').should('have.text', 'Here is a description');
	});

	it('should allow to have some constraints', () => {
		cy.mount(<InlineEditingMulti {...defaultProps} required={true} maxLength={10} />);

		cy.get('[data-testid="inlineediting.button.edit"]').click();
		cy.get('[data-testid="inlineediting.textarea"]').should('have.attr', 'required');
		cy.get('[data-testid="inlineediting.textarea"]')
			.invoke('attr', 'maxLength')
			.should('equal', '10');
	});
});
