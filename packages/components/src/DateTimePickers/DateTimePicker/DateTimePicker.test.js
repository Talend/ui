import React from 'react';
import { shallow } from 'enzyme';

import { mockDate, restoreDate } from '../dateMocking';

import DateTimePicker from './DateTimePicker.component';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

describe('DateTimePicker', () => {
	it('should render', () => {
		mockDate(new Date(2018, 5, 12));

		const wrapper = shallow(<DateTimePicker
			onSubmit={() => {}}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();

		restoreDate();
	});

	describe('view switching', () => {
		it('should render with the DateTimeView based on state', () => {
			const wrapper = shallow(<DateTimePicker
				onSubmit={() => {}}
			/>);

			wrapper.setState({
				isDateTimeView: true,
			});

			expect(wrapper.find(DateTimeView).exists()).toBe(true);
			expect(wrapper.find(MonthYearView).exists()).toBe(false);
		});

		it('should render with the MonthYearView on state', () => {
			const wrapper = shallow(<DateTimePicker
				onSubmit={() => {}}
			/>);

			wrapper.setState({
				isDateTimeView: false,
			});

			expect(wrapper.find(DateTimeView).exists()).toBe(false);
			expect(wrapper.find(MonthYearView).exists()).toBe(true);
		});

		it('should switch state to MonthYearView when header title of DateTimeView is clicked', () => {
			const wrapper = shallow(<DateTimePicker
				onSubmit={() => {}}
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
				onSubmit={() => {}}
			/>);

			wrapper.setState({
				isDateTimeView: false,
			});

			const clickBackHandler = wrapper.find(MonthYearView).prop('onClickBack');
			clickBackHandler();
			expect(wrapper.state('isDateTimeView')).toBe(true);
		});
	});

	it('should have the last "date" data between props and selection in state', () => {
		const d1 = new Date(2018, 2, 5);
		const d2 = new Date(2019, 11, 21);
		const d3 = new Date(2015, 6, 27);
		const wrapper = shallow(<DateTimePicker
			selectedDate={d1}
			onSubmit={() => {}}
		/>);

		wrapper.setState({
			isDateTimeView: true,
		});

		const dateTimeView = wrapper.find(DateTimeView);
		expect(wrapper.state('selectedDate')).toBe(d1);

		dateTimeView.prop('onSelectDate')(d2);
		expect(wrapper.state('selectedDate')).toBe(d2);

		wrapper.setProps({
			selectedDate: d3,
		});
		expect(wrapper.state('selectedDate')).toBe(d3);
	});

	it('should have the last "time" data between props and selection in state', () => {
		const t1 = 810;
		const t2 = 950;
		const t3 = 1270;
		const wrapper = shallow(<DateTimePicker
			selectedTime={t1}
			onSubmit={() => {}}
		/>);

		wrapper.setState({
			isDateTimeView: true,
		});

		const dateTimeView = wrapper.find(DateTimeView);
		expect(wrapper.state('selectedTime')).toBe(t1);

		dateTimeView.prop('onSelectTime')(t2);
		expect(wrapper.state('selectedTime')).toBe(t2);

		wrapper.setProps({
			selectedTime: t3,
		});
		expect(wrapper.state('selectedTime')).toBe(t3);
	});

	// TODO: Enable when the submit button will be implemented
	it.skip('should give back "date" and "time" selected if selected when submited', () => {
		const date = new Date(2018, 1, 1);
		const time = 1000;
		const onSubmit = jest.fn();
		const wrapper = shallow(<DateTimePicker
			selectedDate={date}
			onSubmit={onSubmit}
		/>);

		wrapper.setState({
			isDateTimeView: true,
		});

		// TODO: Switch with the future internal submit button simulation directly
		const dateTimeView = wrapper.find(DateTimeView);
		dateTimeView.prop('onSelectTime')(time);

		expect(onSubmit).toHaveBeenCalledWith({
			date,
			time,
		});
	});

	it('should auto submit when a date or time is selected and both are selected at this time', () => {
		const date = new Date(2018, 1, 1);
		const time = 1000;
		const onSubmit = jest.fn();
		const wrapper = shallow(<DateTimePicker
			selectedDate={date}
			onSubmit={onSubmit}
		/>);

		wrapper.setState({
			isDateTimeView: true,
		});

		// TODO: Switch with the future internal submit button directly
		const dateTimeView = wrapper.find(DateTimeView);
		dateTimeView.prop('onSelectTime')(time);

		expect(onSubmit).toHaveBeenCalledWith({
			date,
			time,
		});
	});

	it('should not submit if one of date and time is not selected', () => {
		const time = 1000;
		const onSubmit = jest.fn();
		const wrapper = shallow(<DateTimePicker
			onSubmit={onSubmit}
		/>);

		wrapper.setState({
			isDateTimeView: true,
		});

		const dateTimeView = wrapper.find(DateTimeView);
		dateTimeView.prop('onSelectTime')(time);

		expect(onSubmit).not.toHaveBeenCalled();
	});
});
