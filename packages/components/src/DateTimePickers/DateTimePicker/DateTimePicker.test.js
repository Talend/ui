import React from 'react';
import { shallow } from 'enzyme';

import { mockDate, restoreDate } from '../shared/utils/test/dateMocking';

import DateTimePicker from './DateTimePicker.component';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

describe('DateTimePicker', () => {
	it('should render', () => {
		mockDate(new Date(2018, 5, 12));

		const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);

		expect(wrapper.getElement()).toMatchSnapshot();

		restoreDate();
	});

	describe('view switching', () => {
		it('should render with the DateTimeView based on state', () => {
			const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);

			wrapper.setState({
				isDateTimeView: true,
			});

			expect(wrapper.find(DateTimeView).exists()).toBe(true);
			expect(wrapper.find(MonthYearView).exists()).toBe(false);
		});

		it('should render with the MonthYearView on state', () => {
			const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);

			wrapper.setState({
				isDateTimeView: false,
			});

			expect(wrapper.find(DateTimeView).exists()).toBe(false);
			expect(wrapper.find(MonthYearView).exists()).toBe(true);
		});

		it('should switch state to MonthYearView when header title of DateTimeView is clicked', () => {
			const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);

			wrapper.setState({
				isDateTimeView: true,
			});

			const clickTitleHandler = wrapper.find(DateTimeView).prop('onClickTitle');
			clickTitleHandler();
			expect(wrapper.state('isDateTimeView')).toBe(false);
		});

		it('should switch state to DateTimeView when header back action of MonthYearView is clicked', () => {
			const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);

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
		const wrapper = shallow(
			<DateTimePicker
				selection={{
					date: d1,
				}}
				onSubmit={() => {}}
			/>,
		);

		wrapper.setState({
			isDateTimeView: true,
		});

		const dateTimeView = wrapper.find(DateTimeView);
		expect(wrapper.state('selectedDate')).toBe(d1);

		dateTimeView.prop('onSelectDate')(null, d2);
		expect(wrapper.state('selectedDate')).toBe(d2);

		wrapper.setProps({
			selection: {
				date: d3,
			},
		});
		expect(wrapper.state('selectedDate')).toBe(d3);
	});

	it('should have the last "time" data between props and selection in state', () => {
		const t1 = 810;
		const t2 = 950;
		const t3 = 1270;
		const wrapper = shallow(
			<DateTimePicker
				selection={{
					time: t1,
				}}
				onSubmit={() => {}}
			/>,
		);

		wrapper.setState({
			isDateTimeView: true,
		});

		const dateTimeView = wrapper.find(DateTimeView);
		expect(wrapper.state('selectedTime')).toBe(t1);

		dateTimeView.prop('onSelectTime')(t2);
		expect(wrapper.state('selectedTime')).toBe(t2);

		wrapper.setProps({
			selection: {
				time: t3,
			},
		});
		expect(wrapper.state('selectedTime')).toBe(t3);
	});

	it('should not update state if props selection wrapper has not changed', () => {
		const initDate = new Date(2018, 0, 1);
		const initTime = 1000;
		const selection = {
			date: initDate,
			time: initTime,
		};

		const wrapper = shallow(<DateTimePicker selection={selection} onSubmit={() => {}} />);

		selection.date = new Date(2020, 0, 1);
		selection.time = 50;

		wrapper.setProps({
			selection,
		});

		expect(wrapper.state('selectedDate')).toBe(initDate);
		expect(wrapper.state('selectedTime')).toBe(initTime);
	});

	it('should auto submit when a date or time is selected and both are selected at this time', () => {
		const date = new Date(2018, 1, 1);
		const time = 1000;
		const onSubmit = jest.fn();
		const wrapper = shallow(
			<DateTimePicker
				selection={{
					date,
				}}
				onSubmit={onSubmit}
			/>,
		);

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
		const wrapper = shallow(<DateTimePicker onSubmit={onSubmit} />);

		wrapper.setState({
			isDateTimeView: true,
		});

		const dateTimeView = wrapper.find(DateTimeView);
		dateTimeView.prop('onSelectTime')(time);

		expect(onSubmit).not.toHaveBeenCalled();
	});

	describe('calendar', () => {
		it('should at initialization define the calendar displayed based on current date when no selection props given', () => {
			mockDate(new Date(2016, 4, 12));

			const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);

			wrapper.setState({
				isDateTimeView: true,
			});

			const dateTimeView = wrapper.find(DateTimeView);
			expect(dateTimeView.prop('calendar')).toEqual({
				monthIndex: 4,
				year: 2016,
			});

			restoreDate();
		});

		it('should at initialization define the calendar displayed based on date selection prop when given', () => {
			const wrapper = shallow(
				<DateTimePicker
					selection={{
						date: new Date(2013, 0, 15),
					}}
					onSubmit={() => {}}
				/>,
			);

			wrapper.setState({
				isDateTimeView: true,
			});

			const dateTimeView = wrapper.find(DateTimeView);
			expect(dateTimeView.prop('calendar')).toEqual({
				monthIndex: 0,
				year: 2013,
			});
		});

		it('should update the calendar displayed based on date selection prop update', () => {
			const wrapper = shallow(
				<DateTimePicker
					selection={{
						date: new Date(2013, 0, 15),
					}}
					onSubmit={() => {}}
				/>,
			);

			wrapper.setState({
				isDateTimeView: true,
			});

			const dateTimeViewBefore = wrapper.find(DateTimeView);
			expect(dateTimeViewBefore.prop('calendar')).toEqual({
				monthIndex: 0,
				year: 2013,
			});

			wrapper.setProps({
				selection: {
					date: new Date(2015, 9, 4),
				},
			});

			const dateTimeViewAfter = wrapper.find(DateTimeView);
			expect(dateTimeViewAfter.prop('calendar')).toEqual({
				monthIndex: 9,
				year: 2015,
			});
		});

		it('should keep actual calendar displayed if date selection prop update to undefined', () => {
			const wrapper = shallow(
				<DateTimePicker
					selection={{
						date: new Date(2013, 0, 15),
					}}
					onSubmit={() => {}}
				/>,
			);

			wrapper.setState({
				isDateTimeView: true,
			});

			const dateTimeViewBefore = wrapper.find(DateTimeView);
			expect(dateTimeViewBefore.prop('calendar')).toEqual({
				monthIndex: 0,
				year: 2013,
			});

			wrapper.setProps({
				selection: {
					date: undefined,
				},
			});

			const dateTimeViewAfter = wrapper.find(DateTimeView);
			expect(dateTimeViewAfter.prop('calendar')).toEqual({
				monthIndex: 0,
				year: 2013,
			});
		});
	});
});
