import React from 'react';
import { composeStories } from '@storybook/testing-react';

import Link from '.';
import * as Stories from './Link.stories';

const { Default, Disabled, WithIcon, External, TargetBlank } = composeStories(Stories);

context('<Link />', () => {
	it('should render', () => {
		cy.mount(<Default data-testid="my.link" />);
		cy.getByTestId('my.link').should('have.text', 'Link example');
	});

	it('should render icon before', () => {
		cy.mount(<WithIcon />);
		cy.getByTest('link.icon.before').should('have.attr', 'name', 'talend-info-circle');
	});

	it('should render icon after', () => {
		cy.mount(<Link iconAfter="talend-stop" />);
		cy.getByTest('link.icon.after').should('have.attr', 'name', 'talend-stop');
	});

	it('should render external', () => {
		cy.mount(<External />);
		cy.getByTest('link.icon.external').should('have.attr', 'name', 'talend-link');
	});

	it('should render disabled', () => {
		cy.mount(<Disabled data-testid="my.link" />);
		cy.getByTestId('my.link').should('have.attr', 'aria-disabled');
	});

	it('should deal with target blank', () => {
		cy.mount(<TargetBlank data-testid="my.link" />);
		cy.getByTestId('my.link')
			.should('have.attr', 'title', 'Open in a new tab')
			.should('have.attr', 'target', '_blank')
			.should('have.attr', 'rel', 'noopener noreferrer');
	});

	it('should deal with unknown target', () => {
		cy.mount(<Link data-testid="my.link" target="unknown" />);
		cy.getByTestId('my.link')
			.should('have.attr', 'title', 'Open in a new tab')
			.should('have.attr', 'rel', 'noopener noreferrer');
	});

	it('should deal with target self', () => {
		cy.mount(<Link data-testid="my.link" target="_self" />);
		cy.getByTestId('my.link').should('not.have.attr', 'title');
		cy.getByTestId('my.link').should('not.have.attr', 'rel');
	});

	it('should have data-feature', () => {
		cy.mount(<Default data-testid="my.link" data-feature="my.feature" />);
		cy.getByTestId('my.link').should('have.attr', 'data-feature', 'my.feature');
	});
});
