/// <reference path="../../../cypress/support/index.d.ts" />

import React from 'react';

import Tag from '.';

context('<Tag />', () => {
	it('should render', () => {
		cy.mount(<Tag data-testid="my.tag" />);
		cy.getByTestId('my.tag').should('to.exist');
	});
});
