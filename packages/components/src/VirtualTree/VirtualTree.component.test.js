import React from 'react';
import { shallow } from 'enzyme';

import Component from './VirtualTree.component';

describe('Component VirtualTree', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Component />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
