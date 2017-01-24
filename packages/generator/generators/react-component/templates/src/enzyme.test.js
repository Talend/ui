import React from 'react';

import { shallow } from 'enzyme';

import <%= props.name %> from './<%= props.name %>.component';

describe('<%= props.name %>', () => {
	it('should render', () => {
		const wrapper = shallow(
			<<%= props.name %> name="Hello world" />
		);
		expect(wrapper.containsMatchingElement(
			<div>Hello world</div>)
		).toBe(true);
	});
});
