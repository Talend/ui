import React from 'react';
import { shallow } from 'enzyme';

import SidePanel from './SidePanel.component';

describe('SidePanel', () => {
	it('should render its name', () => {
		const wrapper = shallow(<SidePanel name="Hello world" />);
		expect(wrapper.containsMatchingElement(<div>Hello world</div>)).toBe(true);
	});
});
