import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from './Toolbar.component';

describe('List Toolbar', () => {
	it('should display nav with children', () => {
		// when
		const wrapper = shallow(
			<Toolbar>
				<div>Hello</div>
			</Toolbar>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
