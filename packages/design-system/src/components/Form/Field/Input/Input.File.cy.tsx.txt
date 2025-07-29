import InputFile from './Input.File';

context('<Form.File />', () => {
	const defaultProps = {
		label: 'Select file here',
		name: 'file',
	};
	it('should render', () => {
		cy.mount(<InputFile {...defaultProps} />);

		cy.get('label').should('have.text', defaultProps.label);
		cy.get('ol[role="list"]').should('not.exist');
		cy.get('button').should('not.exist');
	});

	it('should render with filled value', () => {
		cy.mount(<InputFile {...defaultProps} files={['file.js']} />);

		cy.get('ol[role="list"]').should('have.text', 'file.js');
		cy.get('button').should('exist');
	});

	it('should trigger dom events', () => {
		cy.document().then(doc => {
			doc.addEventListener('change', cy.stub().as('onChange'));
		});

		cy.mount(<InputFile {...defaultProps} />);

		cy.get('input').selectFile(Cypress.Buffer.from('Hello world'));
		cy.get('@onChange').should('have.been.calledOnce');

		cy.get('button').click({ force: true });
		cy.get('@onChange').should('have.been.calledTwice');
	});
});
