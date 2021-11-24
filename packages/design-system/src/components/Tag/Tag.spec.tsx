/// <reference types="cypress" />

import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Tag.stories';

const { Default } = composeStories(Stories);

context('<Tag />', () => {
	it('should render', () => {
		cy.mount(<Default />);
		cy.get('.tag').should('have.text', 'Example');
	});
});
