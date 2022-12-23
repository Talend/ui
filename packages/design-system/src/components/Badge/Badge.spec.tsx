import React from 'react';

import { BadgeTag } from '.';

context('<Tag />', () => {
	// TODO BADGE - do UT
	it('should render', () => {
		cy.mount(<BadgeTag label="Delightful" />);
	});
});
