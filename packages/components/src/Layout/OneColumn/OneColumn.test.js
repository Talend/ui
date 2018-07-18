import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import OneColumn from './OneColumn.component';

describe('OneColumn', () => {
	it('should render', () => {
		const wrapper = shallow(
			<OneColumn>
				<span>children</span>
			</OneColumn>,
		);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
