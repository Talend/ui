import React from 'react';
import { shallow } from 'enzyme';

import DefaultDateCellRenderer from './DefaultDateCellRenderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: 1511873062123 }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find('span').text()).toBe('2017-11-28T12:44:22.123Z');
	});

	it('should return null when value is null', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: null }} />);

		expect(wrapper.getElement()).toBe(null);
	});

	it('should return null when value is empty', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: '' }} />);

		expect(wrapper.getElement()).toBe(null);
	});
});
