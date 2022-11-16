import React from 'react';
import InlineEditing from './';

context('<InlineEditing />', () => {
	it('should go to edit mode when clicking on the button', () => {
		cy.mount(<InlineEditing label="Edit the value" defaultValue="Lorem Ipsum" />);
		// cy.getByTest('inlineediting.button.edit').click();
		// cy.getByTest('inlineediting.input').should('exist').should('have.attr', 'type', 'text');
	});

	it('should go to edit mode when double clicking on the span', () => {
		cy.mount(<InlineEditing label="Edit the value" defaultValue="Lorem Ipsum" />);
		cy.getByTest('inlineediting').dblclick();
		cy.getByTest('inlineediting.input').should('exist').should('have.attr', 'type', 'text');
	});

	it('should render Textarea', () => {
		cy.mount(
			<InlineEditing.Textarea
				label="Edit the value"
				defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in massa velit. Duis vestibulum lectus id lacinia aliquam. Aliquam erat volutpat. Donec dignissim augue eu eros blandit faucibus eu quis nulla. In hac habitasse platea dictumst. Ut egestas viverra sem, et dictum elit lacinia interdum. Vivamus accumsan pulvinar faucibus. Donec vestibulum mauris vitae sem lacinia, eget fringilla leo efficitur. In hac habitasse platea dictumst. Nullam consectetur nunc quis tortor congue imperdiet. Ut lobortis suscipit enim, in aliquet sem viverra ut. Sed finibus ex elit, quis ultricies nulla tincidunt sit amet. Maecenas gravida diam ex, vel aliquam tortor elementum et. Duis vitae ligula tristique est iaculis consequat. Nullam in ipsum turpis. Cras aliquam tellus quis turpis convallis, ut faucibus quam tincidunt."
			/>,
		);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.textarea').should('exist');
	});

	it('should restore value on Esc', () => {
		cy.mount(<InlineEditing label="Edit the value" defaultValue="Lorem ipsum dolor sit amet" />);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.input')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{esc}');
		cy.getByTest('inlineediting').should('have.text', 'Lorem ipsum dolor sit amet');
	});

	it('should validate on Enter', () => {
		cy.mount(<InlineEditing label="Edit the value" defaultValue="Lorem Ipsum" />);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.input')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{enter}');
		cy.getByTest('inlineediting').contains('blah');
	});

	it('should not validate on Enter when multiline', () => {
		cy.mount(
			<InlineEditing.Textarea
				label="Edit the value"
				defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in massa velit. Duis vestibulum lectus id lacinia aliquam. Aliquam erat volutpat. Donec dignissim augue eu eros blandit faucibus eu quis nulla. In hac habitasse platea dictumst. Ut egestas viverra sem, et dictum elit lacinia interdum. Vivamus accumsan pulvinar faucibus. Donec vestibulum mauris vitae sem lacinia, eget fringilla leo efficitur. In hac habitasse platea dictumst. Nullam consectetur nunc quis tortor congue imperdiet. Ut lobortis suscipit enim, in aliquet sem viverra ut. Sed finibus ex elit, quis ultricies nulla tincidunt sit amet. Maecenas gravida diam ex, vel aliquam tortor elementum et. Duis vitae ligula tristique est iaculis consequat. Nullam in ipsum turpis. Cras aliquam tellus quis turpis convallis, ut faucibus quam tincidunt."
			/>,
		);
		cy.getByTest('inlineediting.button.edit').click();
		cy.getByTest('inlineediting.textarea')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{enter}');
		cy.getByTest('inlineediting.textarea').should('exist');
	});
});
