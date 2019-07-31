import React from 'react';
import { shallow } from 'enzyme';

import Container from './MultiSelect.container';

describe('Container MultiSelect', () => {
	it('should render MultiSelect with props', () => {
		const wrapper = shallow(<Container />);
		expect(wrapper.props()).toMatchSnapshot();
	});
});
