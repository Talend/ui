import React from 'react';
import renderer from 'react-test-renderer';

import OneColumn from './OneColumn.component';

describe('OneColumn', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<OneColumn name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
