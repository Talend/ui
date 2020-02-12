import React from 'react';
import { mount, shallow } from 'enzyme';

import CellLabel from './CellLabel.component';

describe('CellLabel', () => {
	it('should default render', () => {
		// given
		const label = 'my label';
		// when
		const wrapper = mount(<CellLabel cellData={label} rowIndex={25} />);
		// then
		expect(
			wrapper
				.find('.label')
				.at(0)
				.text(),
		).toBe(label);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render a label info', () => {
		// given
		const label = 'my label';
		// when
		const wrapper = shallow(<CellLabel cellData={label} rowIndex={25} />);

		// then
		expect(
			wrapper
				.find('.label-info')
				.at(0)
				.text(),
		).toBe(label);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
