import React from 'react';
import { shallow } from 'enzyme';

import { mockDate, restoreDate } from '../dateMocking';

import DateTimePicker from './DateTimePicker.component';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

describe('DateTimePicker', () => {
	it('should render', () => {
		mockDate(new Date(2018, 5, 12));

		const wrapper = shallow(<DateTimePicker />);

		expect(wrapper.getElement()).toMatchSnapshot();

		restoreDate();
	});

	describe('view switching', () => {
		it('should render with the DateTimeView based on state', () => {
			const wrapper = shallow(<DateTimePicker
			/>);

			wrapper.setState({
				isDateTimeView: true,
			});

			expect(wrapper.find(DateTimeView).exists()).toBe(true);
			expect(wrapper.find(MonthYearView).exists()).toBe(false);
		});

		it('should render with the MonthYearView on state', () => {
			const wrapper = shallow(<DateTimePicker
			/>);

			wrapper.setState({
				isDateTimeView: false,
			});

			expect(wrapper.find(DateTimeView).exists()).toBe(false);
			expect(wrapper.find(MonthYearView).exists()).toBe(true);
		});

		it('should switch state to MonthYearView when header title of DateTimeView is clicked', () => {
			const wrapper = shallow(<DateTimePicker
			/>);

			wrapper.setState({
				isDateTimeView: true,
			});

			const clickTitleHandler = wrapper.find(DateTimeView).prop('onClickTitle');
			clickTitleHandler();
			expect(wrapper.state('isDateTimeView')).toBe(false);
		});

		it('should switch state to DateTimeView when header back action of MonthYearView is clicked', () => {
			const wrapper = shallow(<DateTimePicker
			/>);

			wrapper.setState({
				isDateTimeView: false,
			});

			const clickBackHandler = wrapper.find(MonthYearView).prop('onClickBack');
			clickBackHandler();
			expect(wrapper.state('isDateTimeView')).toBe(true);
		});
	});
});
