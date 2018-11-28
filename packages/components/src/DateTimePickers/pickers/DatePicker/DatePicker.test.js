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
	beforeEach(() => {
		mockIsTodayWith(new Date(2018, 5, 20));
	});

	it('should render a DatePicker', () => {
		// given
		const calendar = { year: 2018, monthIndex: 5 };
		const isDisabledChecker = getDisabledChecker([new Date(2018, 5, 6), new Date(2018, 5, 15)]);
		const selectedDate = new Date(2018, 5, 12);

		// when
		const wrapper = mount(
			<DatePicker.WrappedComponent
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
		const calendar = { year: 2018, monthIndex: 5 };

		// when
		const wrapper = mount(
			<DatePicker.WrappedComponent
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
				.at(19) // isToday is mocked as 2018-06-20
				.prop('className'),
		).toContain('theme-today');
	});

	it('should highlight selected date', () => {
		// given
		const calendar = { year: 2018, monthIndex: 5 };
		const selectedDate = new Date(2018, 5, 12);

		// when
		const wrapper = mount(
			<DatePicker.WrappedComponent
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
				.at(11)
				.prop('className'),
		).toContain('theme-selected');
	});

	it('should fade disable date', () => {
		// given
		const calendar = { year: 2018, monthIndex: 5 };
		const isDisabledChecker = getDisabledChecker([new Date(2018, 5, 6)]);

		// when
		const wrapper = mount(
			<DatePicker.WrappedComponent
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
				.at(5)
				.prop('disabled'),
		).toBe(true);
	});

	it('should select date', () => {
		// given
		const calendar = { year: 2018, monthIndex: 5 };
		const onSelect = jest.fn();
		const wrapper = mount(
			<DatePicker.WrappedComponent
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
			.at(0)
			.simulate('click');

		// then
		expect(onSelect).toBeCalledWith(expect.anything(), new Date(2018, 5, 1));
	});

	it('should manage tabIndex', () => {
		const calendar = { year: 2018, monthIndex: 5 };
		const wrapper = mount(
			<DatePicker.WrappedComponent
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
