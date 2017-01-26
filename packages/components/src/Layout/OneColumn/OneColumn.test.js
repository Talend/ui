import React from 'react';
import renderer from 'react-test-renderer';

import OneColumn from './OneColumn.component';

describe('OneColumn', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<OneColumn>
				<span>children</span>
			</OneColumn>).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
