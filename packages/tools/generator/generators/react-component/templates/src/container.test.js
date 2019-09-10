import React from 'react';
import { shallow } from 'enzyme';

import Component from './<%= props.name %>.component';
import Container from './<%= props.name %>.container';

describe('Container <%= props.name %>', () => {
	it('should render <%= props.name %> with props', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper.find(Component).length).toBe(1);
		expect(wrapper.props()).toMatchSnapshot();
	});
});
