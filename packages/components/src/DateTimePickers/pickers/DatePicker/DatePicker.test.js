import React from 'react';
import { shallow } from 'enzyme';
import isSameDay from 'date-fns/is_same_day';
import isToday from 'date-fns/is_today';
import DatePicker from './DatePicker.component';

jest.mock('date-fns/is_today');

describe('DatePicker', () => {
	function mockIsTodayWith(newToday) {
		isToday.mockImplementation(date =>
			isSameDay(date, newToday));
	}

	function getDisabledChecker(disabledDates) {
		return date => disabledDates.some(
			disabledDate => isSameDay(disabledDate, date)
		);
	}

	beforeEach(() => {
		mockIsTodayWith(new Date(2018, 5, 20));
	});

	it('should render a DatePicker', () => {
		const calendar = {
			year: 2018,
			monthIndex: 5,
		};

		const disabledDates = [
			new Date(2018, 5, 6),
			new Date(2018, 5, 15),
		];

		const isDisabledChecker = getDisabledChecker(disabledDates);

		const selectedDate = new Date(2018, 5, 12);

		const wrapper = shallow(<DatePicker
			calendar={calendar}
			selectedDate={selectedDate}
			onSelect={() => {}}
			isDisabledChecker={isDisabledChecker}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('body calendar', () => {
		describe('first date of month in the correct grid column (When monday as first day of week)', () => {
			function getFirstRowCellText(wrapper, column) {
				return wrapper
					.find('.calendar-body .calendar-row')
					.first()
					.find('.calendar-item')
					.at(column - 1)
					.find('DayPickerAction')
					.prop('label')
					.toString();
			}

			it('should have the first date of month in 1st column when it\'s monday', () => {
				const calendar = {
					year: 2018,
					monthIndex: 0,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(getFirstRowCellText(wrapper, 1)).toBe('1');
			});

			it('should have the first date of month in 4th column when it\'s thursday', () => {
				const calendar = {
					year: 2018,
					monthIndex: 2,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(getFirstRowCellText(wrapper, 4)).toBe('1');
			});

			it('should have the first date of month in 7th column when it\'s sunday', () => {
				const calendar = {
					year: 2018,
					monthIndex: 3,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(getFirstRowCellText(wrapper, 7)).toBe('1');
			});
		});


		describe('last date of month in the correct grid column (When monday as first day of week)', () => {
			function getLastRowCellText(wrapper, column) {
				return wrapper
					.find('.calendar-body .calendar-row')
					.last()
					.find('.calendar-item')
					.at(column - 1)
					.find('DayPickerAction')
					.prop('label')
					.toString();
			}

			it('should have the last date of month in 1st column when it\'s monday', () => {
				const calendar = {
					year: 2018,
					monthIndex: 3,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(getLastRowCellText(wrapper, 1)).toBe('30');
			});

			it('should have the last date of month in 4th column when it\'s thursday', () => {
				const calendar = {
					year: 2018,
					monthIndex: 4,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(getLastRowCellText(wrapper, 4)).toBe('31');
			});

			it('should have the last date of month in 7th column when it\'s sunday', () => {
				const calendar = {
					year: 2018,
					monthIndex: 8,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(getLastRowCellText(wrapper, 7)).toBe('30');
			});
		});

		describe('number of weeks displayed', () => {
			function nbOfWeeksRendered(wrapper) {
				return wrapper.find('.calendar-body .calendar-row').length;
			}

			it('should have 4 weeks for february 2010', () => {
				const calendar = {
					year: 2010,
					monthIndex: 1,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(nbOfWeeksRendered(wrapper)).toBe(4);
			});

			it('should have 5 weeks for june 2018', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(nbOfWeeksRendered(wrapper)).toBe(5);
			});

			it('should have 6 weeks for october 2017', () => {
				const calendar = {
					year: 2017,
					monthIndex: 9,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				expect(nbOfWeeksRendered(wrapper)).toBe(6);
			});
		});

		describe('contiguous ordered numbers', () => {
			function getDayNumbers(wrapper) {
				return wrapper
					.find('.calendar-body .calendar-item')
					.find('DayPickerAction')
					.map(action => action.prop('label'))
					.map(label => parseInt(label, 10));
			}

			function ascSorting(a, b) {
				return a - b;
			}

			it('should have contiguous numbers on a 31 days month', () => {
				const calendar = {
					year: 2018,
					monthIndex: 6,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const days = getDayNumbers(wrapper);
				const copy = [...days];
				days.sort(ascSorting);
				expect(days).toEqual(copy);
				expect(days[0]).toBe(1);
				expect(days).toHaveLength(31);
			});

			it('should have contiguous numbers on a 29 days month', () => {
				const calendar = {
					year: 2016,
					monthIndex: 1,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const days = getDayNumbers(wrapper);
				const copy = [...days];
				days.sort(ascSorting);
				expect(days).toEqual(copy);
				expect(days[0]).toBe(1);
				expect(days).toHaveLength(29);
			});

			it('should have contiguous numbers on a 28 days month', () => {
				const calendar = {
					year: 2017,
					monthIndex: 1,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const days = getDayNumbers(wrapper);
				const copy = [...days];
				days.sort(ascSorting);
				expect(days).toEqual(copy);
				expect(days[0]).toBe(1);
				expect(days).toHaveLength(28);
			});

			it('should have contiguous numbers on a 30 days month', () => {
				const calendar = {
					year: 2022,
					monthIndex: 10,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const days = getDayNumbers(wrapper);
				const copy = [...days];
				days.sort(ascSorting);
				expect(days).toEqual(copy);
				expect(days[0]).toBe(1);
				expect(days).toHaveLength(30);
			});
		});

		describe('today', () => {
			it('should render specifically the today date', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				mockIsTodayWith(new Date(2018, 5, 13));

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const currentDayItems = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isToday'));

				expect(currentDayItems).toHaveLength(1);
				const item = currentDayItems.first();
				expect(item.prop('label').toString()).toBe('13');
			});

			it('should not render specifically any date if today is out of displayed calendar', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				mockIsTodayWith(new Date(2018, 4, 13));

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const currentDayItems = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isToday'));

				expect(currentDayItems).toHaveLength(0);
			});

			it('should have updated the date marked as today if today date has changed between two renders', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				// First day
				mockIsTodayWith(new Date(2018, 5, 16));

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const currentDayItems = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(dayItem => dayItem.prop('isToday'));

				expect(currentDayItems).toHaveLength(1);
				const item = currentDayItems.first();
				expect(item.prop('label').toString()).toBe('16');

				// Change to next day
				mockIsTodayWith(new Date(2018, 5, 17));

				const newWrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const newDayItems = newWrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(dayItem => dayItem.prop('isToday'));

				expect(newDayItems).toHaveLength(1);
				const newItem = newDayItems.first();
				expect(newItem.prop('label').toString()).toBe('17');
			});
		});

		describe('selected date', () => {
			it('should render specifically the selected date', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const selectedDate = new Date(2018, 5, 12);

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					selectedDate={selectedDate}
					onSelect={() => {}}
				/>);

				const currentDayItems = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isSelected'));

				expect(currentDayItems).toHaveLength(1);
				const item = currentDayItems.first();
				expect(item.prop('label').toString()).toBe('12');
			});

			it('should not render specifically a date if no selected date given', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const currentDayItems = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isSelected'));

				expect(currentDayItems).toHaveLength(0);
			});

			it('should not render specifically a date if selected date is out of displayed calendar', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const selectedDate = new Date(2018, 4, 12);

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					selectedDate={selectedDate}
					onSelect={() => {}}
				/>);

				const currentDayItems = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isSelected'));

				expect(currentDayItems).toHaveLength(0);
			});
		});

		describe('date selection', () => {
			it('should callback with the date picked', () => {
				const onSelect = jest.fn();

				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const dayToSelect = 8;
				const expectedNewSelectedDate = new Date(2018, 5, dayToSelect);

				const selectedDate = new Date(2018, 5, 12);
				const wrapper = shallow(<DatePicker
					calendar={calendar}
					selectedDate={selectedDate}
					onSelect={onSelect}
				/>);

				const dayPickerAction = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('label').toString() === dayToSelect.toString());

				dayPickerAction.simulate('click');

				expect(onSelect).toHaveBeenCalledWith(expectedNewSelectedDate);
			});
		});

		describe('disabled checker', () => {
			it('should not have any disabled date action if no checker set', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
				/>);

				const disabledActions = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isDisabled'));

				expect(disabledActions).toHaveLength(0);
			});

			it('should not have any disabled date action if checker have no date matching the current month calendar', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const disabledDatesDefined = [
					new Date(2018, 4, 17),
					new Date(2018, 6, 26),
				];

				const isDisabledChecker = getDisabledChecker(disabledDatesDefined);

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
					isDisabledChecker={isDisabledChecker}
				/>);

				const disabledActions = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isDisabled'));

				expect(disabledActions).toHaveLength(0);
			});

			it('should disable the specific dates defined in the checker', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const disabledDatesDefined = [
					new Date(2018, 5, 17),
					new Date(2018, 5, 26),
					new Date(2018, 5, 28),
					new Date(2018, 5, 30),
				];
				const isDisabledChecker = getDisabledChecker(disabledDatesDefined);

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					onSelect={() => {}}
					isDisabledChecker={isDisabledChecker}
				/>);

				const disabledActionsLabels = wrapper
					.find('.calendar-body .calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isDisabled'))
					.map(item => item.prop('label').toString());

				const expectedDisabledLabels = disabledDatesDefined
					.map(date => date.getDate().toString());

				expect(disabledActionsLabels).toEqual(expectedDisabledLabels);
			});
		});
	});

	describe('header calendar', () => {
		it('should display the exact days sequence', () => {
			const sequence = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

			const calendar = {
				year: 2018,
				monthIndex: 5,
			};

			const wrapper = shallow(<DatePicker
				calendar={calendar}
				onSelect={() => {}}
			/>);

			const sequenceExpected = sequence.map(day => day[0].toUpperCase());

			const sequenceRendered = wrapper
				.find('.calendar-header .calendar-item')
				.map(item => item.text());

			expect(sequenceRendered).toEqual(sequenceExpected);
		});
	});
});
