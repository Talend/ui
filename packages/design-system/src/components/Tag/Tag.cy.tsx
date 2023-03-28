/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';

import { Tag } from '.';

context('<Tag />', () => {
	it('should render', () => {
		cy.mount(<Tag data-testid="my.tag" />);
		cy.findByTestId('my.tag').should('to.exist');
	});
});
