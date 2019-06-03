import React from 'react';
import { shallow } from 'enzyme';

import ListToolbar from './ListToolbar.component';

describe('List Toolbar', () => {
	it('should display nav with children', () => {
		// when
		const wrapper = shallow(
			<ListToolbar>
				<div>Hello</div>
			</ListToolbar>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
