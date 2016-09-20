import React from 'react';
import { shallow } from 'enzyme';

import List from './List.component';

describe('List', () => {
	it('should render its name', () => {
		const wrapper = shallow(<List name="Hello world" />);
		expect(wrapper.containsMatchingElement(<div>Hello world</div>)).toBe(true);
	});
});
