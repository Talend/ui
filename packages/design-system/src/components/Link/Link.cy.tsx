/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';

import Link from './';
context('<Link />', () => {
	beforeEach(() => {
		cy.configureCypressTestingLibrary({ testIdAttribute: 'data-test' });
	});
	it('should render', () => {
		cy.mount(
			<Link href="#" data-test="my.link">
				Link example
			</Link>,
		);
		cy.findByTestId('my.link').should('have.text', 'Link example');
	});

	it('should render icon before', () => {
		cy.mount(<Link href="#" icon="information-filled" />);
		cy.findByTestId('link.icon.before').should('be.visible');
	});

	it('should render external', () => {
		cy.mount(<Link href="https://www.talend.com" />);
		cy.findByTestId('link.icon.external').should('be.visible');
	});

	it('should render disabled', () => {
		cy.mount(<Link href="#" icon="information-filled" disabled data-test="my.link" />);
		cy.findByTestId('my.link').should('have.attr', 'aria-disabled');
	});

	it('should deal with target blank', () => {
		cy.mount(
			<Link href="#" target="_blank" data-test="my.link">
				Link example
			</Link>,
		);
		cy.findByTestId('my.link')
			.should('have.attr', 'title', 'Open in a new tab')
			.should('have.attr', 'target', '_blank')
			.should('have.attr', 'rel', 'noreferrer noopener');
	});

	it('should deal with unknown target', () => {
		cy.mount(
			<Link data-test="my.link" target="unknown">
				Unknown target
			</Link>,
		);
		cy.findByTestId('my.link')
			.should('have.attr', 'title', 'Open in a new tab')
			.should('have.attr', 'rel', 'noreferrer noopener');
	});

	it('should deal with target self', () => {
		cy.mount(
			<Link data-test="my.link" target="_self">
				Self target
			</Link>,
		);
		cy.findByTestId('my.link').should('not.have.attr', 'title');
		cy.findByTestId('my.link').should('not.have.attr', 'rel');
	});

	it('should have data-feature', () => {
		cy.mount(<Link href="#" data-test="my.link" data-feature="my.feature" />);
		cy.findByTestId('my.link').should('have.attr', 'data-feature', 'my.feature');
	});
});
