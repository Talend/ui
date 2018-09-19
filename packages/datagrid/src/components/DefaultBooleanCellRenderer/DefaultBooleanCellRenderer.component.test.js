import React from 'react';
import { shallow } from 'enzyme';

import DefaultBooleanCellRenderer from './DefaultBooleanCellRenderer.component';

describe('DatagridBooleanCellRenderer', () => {
	it('should render a boolean value', () => {
		const wrapper = shallow(<DefaultBooleanCellRenderer data={{ value: false }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a int value', () => {
		const wrapper = shallow(<DefaultBooleanCellRenderer data={{ value: 0 }} />);

		expect(wrapper.props().value).toBe('0');
		expect(wrapper.find('DefaultValueRenderer').length).toBe(1);
	});

	it('should render a string value', () => {
		const wrapper = shallow(<DefaultBooleanCellRenderer data={{ value: 'value' }} />);

		expect(wrapper.props().value).toBe('value');
		expect(wrapper.find('DefaultValueRenderer').length).toBe(1);
	});
});
