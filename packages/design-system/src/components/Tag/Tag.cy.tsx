import React from 'react';

import { Tag } from '.';

context('<Tag />', () => {
	it('should render', () => {
		cy.mount(<Tag data-testid="my.tag" />);
		cy.findByTestId('my.tag').should('to.exist');
	});
});
