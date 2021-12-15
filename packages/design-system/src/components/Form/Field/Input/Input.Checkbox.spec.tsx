import React from 'react';
import { composeStories } from '@storybook/testing-react';
import Checkbox from './Input.Checkbox';
import * as Stories from './Input.Checkbox.stories';

const { DataFeature } = composeStories(Stories);

describe('Checkbox', () => {
	it('Should set data-feature label', () => {
		cy.mount(<DataFeature />);

		cy.getByFeature('my.prefix.enable').click();
		cy.getByFeature('my.prefix.enable').should('not.exist');

		cy.getByFeature('my.prefix.disable').click();
		cy.getByFeature('my.prefix.disable').should('not.exist');
	});
});
