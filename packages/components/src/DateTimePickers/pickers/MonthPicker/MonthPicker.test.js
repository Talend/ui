import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import MonthPicker from './MonthPicker.component';

describe('MonthPicker', () => {
	it('should render', () => {
		// when
		const wrapper = mount(
			<MonthPicker onSelect={jest.fn()} selectedMonthIndex={4} selectedYear={2018} />,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should highlight selected month', () => {
		// when
		const wrapper = mount(<MonthPicker onSelect={jest.fn()} selectedMonthIndex={4} />);

		// then
		expect(
			wrapper
				.find('.tc-date-picker-month')
				.at(4)
				.prop('className'),
		).toContain('theme-selected');
	});

	it('should trigger props.onSelect on selection', () => {
		// given
		const onSelect = jest.fn();
		const wrapper = mount(<MonthPicker onSelect={onSelect} />);

		// when
		wrapper
			.find('.tc-date-picker-month')
			.at(4)
			.simulate('click');

		// then
		expect(onSelect).toBeCalledWith(expect.anything(), 4);
	});

	it('should manage tabIndex', () => {
		// given
		const wrapper = mount(<MonthPicker onSelect={jest.fn()} selectedMonthIndex={4} />);
		expect(
			wrapper
				.find('.tc-date-picker-month')
				.at(4)
				.prop('tabIndex'),
		).toBe(-1);

		// when
		wrapper.setProps({ allowFocus: true });

		// then
		expect(
			wrapper
				.find('.tc-date-picker-month')
				.at(4)
				.prop('tabIndex'),
		).toBe(0);
	});
});
