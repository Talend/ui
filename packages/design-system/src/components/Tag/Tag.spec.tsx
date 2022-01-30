/// <reference types="cypress" />

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Tag.stories';

const { Default } = composeStories(Stories);

context('<Tag />', () => {
	// FIXME https://testing-library.com/docs/cypress-testing-library/intro/
	it('should render', () => {
		cy.mount(<Default data-test="tag" />);
		cy.getByTest('tag').should('be.visible').should('have.text', 'Example');
	});
});
