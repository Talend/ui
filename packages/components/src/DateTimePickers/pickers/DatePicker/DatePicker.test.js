import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import isSameDay from 'date-fns/is_same_day';
import isToday from 'date-fns/is_today';
import DatePicker from './DatePicker.component';

jest.mock('date-fns/is_today');

function mockIsTodayWith(newToday) {
	isToday.mockImplementation(date => isSameDay(date, newToday));
}

function getDisabledChecker(disabledDates) {
	return date => disabledDates.some(disabledDate => isSameDay(disabledDate, date));
}

describe('DatePicker', () => {
	const YEAR = 2018;
	const MONTH_INDEX = 5; // month July
	const numOfPreviousDaysInCurrentCalendar = 4;// last 4 days of May will be showed in current calendar month

	beforeEach(() => {
		mockIsTodayWith(new Date(YEAR, MONTH_INDEX, 20));
	});

	it('should render a DatePicker', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const isDisabledChecker = getDisabledChecker([new Date(YEAR, MONTH_INDEX, 6), new Date(YEAR, MONTH_INDEX, 15)]);
		const selectedDate = new Date(YEAR, MONTH_INDEX, 12);

		// when
		const wrapper = mount(
			<DatePicker
				calendar={calendar}
				isDisabledChecker={isDisabledChecker}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
				selectedDate={selectedDate}
			/>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should highlight today', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };

		// when
		const wrapper = mount(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);

		// then
		expect(
			wrapper
				.find('.tc-date-picker-day')
				.at(1)
				.prop('className'),
		).not.toContain('theme-today');
		expect(
			wrapper
				.find('.tc-date-picker-day')
				.at(19 + numOfPreviousDaysInCurrentCalendar) // isToday is mocked as 2018-06-20.
				.prop('className'),
		).toContain('theme-today');
	});

	it('should highlight selected date', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const selectedDate = new Date(YEAR, MONTH_INDEX, 12);

		// when
		const wrapper = mount(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
				selectedDate={selectedDate}
			/>,
		);

		// then
		expect(
			wrapper
				.find('.tc-date-picker-day')
				.at(0)
				.prop('className'),
		).not.toContain('theme-selected');
		expect(
			wrapper
				.find('.tc-date-picker-day')
				.at(11 + numOfPreviousDaysInCurrentCalendar)
				.prop('className'),
		).toContain('theme-selected');
	});

	it('should fade disable date', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const isDisabledChecker = getDisabledChecker([new Date(YEAR, MONTH_INDEX, 6)]);

		// when
		const wrapper = mount(
			<DatePicker
				calendar={calendar}
				isDisabledChecker={isDisabledChecker}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);

		// then
		expect(
			wrapper
				.find('.tc-date-picker-day')
				.at(0)
				.prop('disabled'),
		).toBe(false);
		expect(
			wrapper
				.find('.tc-date-picker-day')
				.at(5 + numOfPreviousDaysInCurrentCalendar)
				.prop('disabled'),
		).toBe(true);
	});

	it('should select date', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const onSelect = jest.fn();
		const wrapper = mount(
			<DatePicker
				calendar={calendar}
				onSelect={onSelect}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);
		expect(onSelect).not.toBeCalled();

		// when
		wrapper
			.find('.tc-date-picker-day')
			.at(0 + numOfPreviousDaysInCurrentCalendar)
			.simulate('click');

		// then
		expect(onSelect).toBeCalledWith(expect.anything(), new Date(YEAR, MONTH_INDEX, 1));
	});

	it('should manage tabIndex', () => {
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const wrapper = mount(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);
		expect(
			wrapper
				.find('.tc-date-picker-day')
				.at(0)
				.prop('tabIndex'),
		).toBe(-1);

		// when
		wrapper.setProps({ allowFocus: true });

		// then
		expect(
			wrapper
				.find('.tc-date-picker-day')
				.at(0)
				.prop('tabIndex'),
		).toBe(0);
	});
});
