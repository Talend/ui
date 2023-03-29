import React from 'react';
import Password from './Password';

const Default = () => <Password label="Password" name="password" id="password" />;
const Filled = () => (
	<Password label="Password" name="password" id="password" defaultValue="defaultPassword" />
);

context('<Form.Password />', () => {
	it('should render', () => {
		cy.mount(<Default />);
		cy.get('input').should('have.attr', 'type', 'password');
	});

	it('should reveal value', () => {
		cy.mount(<Default />);
		cy.get('input').should('have.attr', 'type', 'password');
		cy.get('button').click();
		cy.get('input').should('have.attr', 'type', 'text').should('be.focused');
	});

	it('should hide value on blur', () => {
		cy.mount(<Filled />);
		cy.get('input').should('have.attr', 'type', 'password');
		cy.get('button').click();
		cy.get('input').blur();
		cy.get('input').should('have.attr', 'type', 'password');
	});
});
