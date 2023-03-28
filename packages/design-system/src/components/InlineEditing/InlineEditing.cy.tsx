/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import InlineEditing from './';

context('<InlineEditing />', () => {
	beforeEach(() => {
		cy.configureCypressTestingLibrary({ testIdAttribute: 'data-test' });
	});
	it('should go to edit mode when clicking on the button', () => {
		cy.mount(<InlineEditing label="Edit the value" defaultValue="Lorem Ipsum" />);
		cy.findByTestId('inlineediting.button.edit').click();
		cy.findByTestId('inlineediting.input').should('exist').should('have.attr', 'type', 'text');
	});

	it('should go to edit mode when double clicking on the span', () => {
		cy.mount(<InlineEditing label="Edit the value" defaultValue="Lorem Ipsum" />);
		cy.findByTestId('inlineediting').dblclick();
		cy.findByTestId('inlineediting.input').should('exist').should('have.attr', 'type', 'text');
	});

	it('should render Textarea', () => {
		cy.mount(
			<InlineEditing.Textarea
				label="Edit the value"
				defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in massa velit. Duis vestibulum lectus id lacinia aliquam. Aliquam erat volutpat. Donec dignissim augue eu eros blandit faucibus eu quis nulla. In hac habitasse platea dictumst. Ut egestas viverra sem, et dictum elit lacinia interdum. Vivamus accumsan pulvinar faucibus. Donec vestibulum mauris vitae sem lacinia, eget fringilla leo efficitur. In hac habitasse platea dictumst. Nullam consectetur nunc quis tortor congue imperdiet. Ut lobortis suscipit enim, in aliquet sem viverra ut. Sed finibus ex elit, quis ultricies nulla tincidunt sit amet. Maecenas gravida diam ex, vel aliquam tortor elementum et. Duis vitae ligula tristique est iaculis consequat. Nullam in ipsum turpis. Cras aliquam tellus quis turpis convallis, ut faucibus quam tincidunt."
			/>,
		);
		cy.findByTestId('inlineediting.button.edit').click();
		cy.findByTestId('inlineediting.textarea').should('exist');
	});

	it('should restore value on Esc', () => {
		cy.mount(<InlineEditing label="Edit the value" defaultValue="Lorem ipsum dolor sit amet" />);
		cy.findByTestId('inlineediting.button.edit').click();
		cy.findByTestId('inlineediting.input')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{esc}');
		cy.findByTestId('inlineediting').should('have.text', 'Lorem ipsum dolor sit amet');
	});

	it('should validate on Enter', () => {
		cy.mount(<InlineEditing label="Edit the value" defaultValue="Lorem Ipsum" />);
		cy.findByTestId('inlineediting.button.edit').click();
		cy.findByTestId('inlineediting.input')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{enter}');
		cy.findByTestId('inlineediting').should('have.text', 'blah');
	});

	it('should not validate on Enter when multiline', () => {
		cy.mount(
			<InlineEditing.Textarea
				label="Edit the value"
				defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in massa velit. Duis vestibulum lectus id lacinia aliquam. Aliquam erat volutpat. Donec dignissim augue eu eros blandit faucibus eu quis nulla. In hac habitasse platea dictumst. Ut egestas viverra sem, et dictum elit lacinia interdum. Vivamus accumsan pulvinar faucibus. Donec vestibulum mauris vitae sem lacinia, eget fringilla leo efficitur. In hac habitasse platea dictumst. Nullam consectetur nunc quis tortor congue imperdiet. Ut lobortis suscipit enim, in aliquet sem viverra ut. Sed finibus ex elit, quis ultricies nulla tincidunt sit amet. Maecenas gravida diam ex, vel aliquam tortor elementum et. Duis vitae ligula tristique est iaculis consequat. Nullam in ipsum turpis. Cras aliquam tellus quis turpis convallis, ut faucibus quam tincidunt."
			/>,
		);
		cy.findByTestId('inlineediting.button.edit').click();
		cy.findByTestId('inlineediting.textarea')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah')
			.type('{enter}');
		cy.findByTestId('inlineediting.textarea').should('exist');
	});

	it('should trigger cancel on Enter with focus on cancel button', () => {
		const defaultValue =
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in massa velit. Duis vestibulum lectus id lacinia aliquam. Aliquam erat volutpat. Donec dignissim augue eu eros blandit faucibus eu quis nulla. In hac habitasse platea dictumst. Ut egestas viverra sem, et dictum elit lacinia interdum. Vivamus accumsan pulvinar faucibus. Donec vestibulum mauris vitae sem lacinia, eget fringilla leo efficitur. In hac habitasse platea dictumst. Nullam consectetur nunc quis tortor congue imperdiet. Ut lobortis suscipit enim, in aliquet sem viverra ut. Sed finibus ex elit, quis ultricies nulla tincidunt sit amet. Maecenas gravida diam ex, vel aliquam tortor elementum et. Duis vitae ligula tristique est iaculis consequat. Nullam in ipsum turpis. Cras aliquam tellus quis turpis convallis, ut faucibus quam tincidunt.';
		cy.mount(<InlineEditing.Textarea label="Edit the value" defaultValue={defaultValue} />);
		cy.findByTestId('inlineediting.button.edit').click();
		cy.findByTestId('inlineediting.textarea')
			.focus()
			.type('{selectall}{del}blah')
			.should('have.value', 'blah');
		cy.findByTestId('inlineediting.button.cancel').focus().type('{enter}');
		cy.findByTestId('inlineediting').should('have.text', defaultValue);
	});
});
