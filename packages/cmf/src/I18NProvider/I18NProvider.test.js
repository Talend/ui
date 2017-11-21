import React from 'react';

import { shallow } from 'enzyme';

import INProvider from './INProvider.component';

describe('INProvider', () => {
	it('should render', () => {
		const wrapper = shallow(
			<INProvider name="Hello world" />
		);
		expect(wrapper.containsMatchingElement(
			<div>Hello world</div>)
		).toBe(true);
	});
});
