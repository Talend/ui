import React from 'react';
import { shallow } from 'enzyme';

import DefaultDateCellRenderer from './DefaultDateCellRenderer.component';
import DefaultValueRenderer from '../DefaultCellRenderer/DefaultValueRenderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer with DefaultValueRenderer', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: 1511873062123 }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(DefaultValueRenderer).prop('value')).toBe('2017-11-28T12:44:22.123Z');
	});

	it('should do nothing when value is null', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: null }} />);

		expect(wrapper.find(DefaultValueRenderer).prop('value')).toBe(null);
	});

	it('should do nothing when value is undefined', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: undefined }} />);

		expect(wrapper.find(DefaultValueRenderer).prop('value')).toBe(undefined);
	});

	it('should show initial value when the parsed value fails', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: 'sdqs' }} />);

		expect(wrapper.find(DefaultValueRenderer).prop('value')).toBe('sdqs');
	});

	it('should show one date when value is 0', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: 0 }} />);

		expect(wrapper.find(DefaultValueRenderer).prop('value')).toBe('1970-01-01T00:00:00.000Z');
	});
});
