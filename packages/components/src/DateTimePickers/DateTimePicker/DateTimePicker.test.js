import React from 'react';
import { shallow } from 'enzyme';

import DateTimePicker from './DateTimePicker.component';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

describe('DateTimePicker', () => {
	it('should render', () => {
		const wrapper = shallow(<DateTimePicker />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with the DateTimeView', () => {
		const wrapper = shallow(<DateTimePicker />);

		wrapper.setState({
			isCalendarView: true,
		});

		expect(wrapper.find(DateTimeView).exists()).toBe(true);
		expect(wrapper.find(MonthYearView).exists()).toBe(false);
	});

	it('should render with the MonthYearView', () => {
		const wrapper = shallow(<DateTimePicker />);

		wrapper.setState({
			isCalendarView: false,
		});

		expect(wrapper.find(DateTimeView).exists()).toBe(false);
		expect(wrapper.find(MonthYearView).exists()).toBe(true);
	});
});
