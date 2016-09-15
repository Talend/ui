import React from 'react';
import { shallow } from 'enzyme';

import AppHeaderBar from './AppHeaderBar.component';

describe('AppHeaderBar', () => {
	it('should render its name', () => {
		const wrapper = shallow(<AppHeaderBar name="Hello world" />);
		expect(wrapper.containsMatchingElement(<div>Hello world</div>)).toBe(true);
	});
});
