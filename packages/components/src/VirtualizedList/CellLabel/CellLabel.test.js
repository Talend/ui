import React from 'react';

import { mount } from 'enzyme';

import CellLabel from './CellLabel.component';

describe('CellLabel', () => {
	it('should default render an object', () => {
		// given
		const label = { label: 'my label', style: 'info' };
		// when
		const wrapper = mount(<CellLabel cellData={label} rowIndex={25} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should default render a string', () => {
		// given
		const label = 'my label';
		// when
		const wrapper = mount(<CellLabel cellData={label} rowIndex={25} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
