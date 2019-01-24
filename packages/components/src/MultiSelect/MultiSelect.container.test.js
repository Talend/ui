import React from 'react';
import { shallow } from 'enzyme';

import Component from './MultiSelect.component';
import Container from './MultiSelect.container';

describe('Container MultiSelect', () => {
	it('should render MultiSelect with props', () => {
		const wrapper = shallow(<Container />);
		expect(wrapper.find(Component).length).toBe(1);
		expect(wrapper.props()).toMatchSnapshot();
	});
});
