/// <reference types="cypress" />

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Link.stories';

const { Default, WithIcon, External, TargetBlank } = composeStories(Stories);

context('<Link />', () => {
	it('should render', () => {
		cy.mount(<Default />);
		cy.get('a').should('have.text', 'Link example');
	});

	it('should render icon', () => {
		cy.mount(<WithIcon />);
		cy.get('a svg').should('have.attr', 'name', 'talend-info-circle');
	});

	it('should render external', () => {
		cy.mount(<External />);
		cy.get('a svg').should('have.attr', 'name', 'talend-link');
	});

	it('should render target blank', () => {
		cy.mount(<TargetBlank />);
		cy.get('a')
			.should('have.attr', 'title', 'Open in a new tab')
			.should('have.attr', 'target', '_blank')
			.should('have.attr', 'rel', 'noopener noreferrer');
	});
});
