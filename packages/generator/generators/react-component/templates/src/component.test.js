import React from 'react';
import { shallow } from 'enzyme';

import Component from './<%= props.name %>.component';

describe('Component <%= props.name %>', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Component />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
