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
	const MONTH_INDEX = 5; // month June
	// last 4 days of May will be showed in current calendar month
	const numOfPreviousDaysInCurrentCalendar = 4;

	beforeEach(() => {
		mockIsTodayWith(new Date(YEAR, MONTH_INDEX, 20));
	});

	it('should render a DatePicker', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const isDisabledChecker = getDisabledChecker([
			new Date(YEAR, MONTH_INDEX, 6),
			new Date(YEAR, MONTH_INDEX, 15),
		]);
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

	it('should highlight date range', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };

		// when
		const wrapper = mount(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
				startDate={new Date(2018, 5, 1)}
				endDate={new Date(2018, 5, 3)}
			/>,
		);

		// then
		const startDate = wrapper.find('.tc-date-picker-day').at(4);
		const startDateTableCell = wrapper.find('td').at(4);

		expect(startDate.prop('className')).toContain('theme-selected');
		expect(startDateTableCell.prop('className')).toContain('theme-range-start');

		const endDate = wrapper.find('.tc-date-picker-day').at(6);
		const endDateTableCell = wrapper.find('td').at(6);

		expect(endDate.prop('className')).toContain('theme-selected');
		expect(endDateTableCell.prop('className')).toContain('theme-range-end');

		const middleTableCell = wrapper.find('td').at(5);
		expect(middleTableCell.prop('className')).toContain('theme-date-range');
		expect(middleTableCell.prop('className')).toContain('theme-range-middle');
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
		).toBe(-1);
		expect(
			wrapper
				.find('.tc-date-picker-day[data-value]')
				.at(0)
				.prop('tabIndex'),
		).toBe(0);
	});

	it('should have 6 weeks', () => {
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const wrapper = mount(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);

		expect(wrapper.find('.tc-date-picker-day').length).toBe(6 * 7);
	});

	it('should go to next month if select a date of next month', () => {
		const year = 2019;
		const monthIndex = 11;
		const calendar = { year, monthIndex };

		const props = {
			calendar,
			onSelect: jest.fn(),
			goToPreviousMonth: jest.fn(),
			goToNextMonth: jest.fn(),
		};
		const wrapper = mount(<DatePicker {...props} />);
		wrapper
			.find('.tc-date-picker-day')
			.at(40) // click 2020-01-04
			.simulate('click');

		expect(props.onSelect).toBeCalledWith(expect.anything(), new Date(year + 1, 0, 4));
		expect(props.goToNextMonth).toBeCalled();
		expect(props.goToPreviousMonth).not.toBeCalled();
	});
});
