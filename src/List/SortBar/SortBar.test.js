import React from 'react';
import { shallow } from 'enzyme';

import SortBar from './SortBar.component';

describe('SortBar', () => {
	it('should render its name', () => {
		const wrapper = shallow(<SortBar name="Hello world" />);
		expect(wrapper.containsMatchingElement(<div>Hello world</div>)).toBe(true);
	});
});
