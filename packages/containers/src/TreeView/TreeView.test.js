import React from 'react';

import { shallow } from 'enzyme';

import TreeView from './TreeView.container';

describe('TreeView', () => {
	it('should render', () => {
		const wrapper = shallow(
			<TreeView name="Hello world" />
		);
		expect(wrapper.containsMatchingElement(
			<div>Hello world</div>)
		).toBe(true);
	});
});
