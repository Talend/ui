import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from './DatePicker.component';

describe('DatePicker', () => {
	const currentDate = new Date(2018, 5, 20);

	it('should render a DatePicker', () => {
		const calendar = {
			year: 2018,
			monthIndex: 5,
		};

		const wrapper = shallow(<DatePicker
			calendar={calendar}
			currentDate={currentDate}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('body calendar', () => {
		describe('first date in the correct day column (Monday as first column)', () => {
			function getFirstRowCellText(wrapper, column) {
				return wrapper
					.find('.theme-calendar-body-row')
					.first()
					.find('.theme-calendar-item')
					.at(column - 1)
					.find('DayPickerAction')
					.prop('label');
			}

			it('should have monday in the 1st column for january 2018', () => {
				const calendar = {
					year: 2018,
					monthIndex: 0,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				expect(getFirstRowCellText(wrapper, 1)).toBe('1');
			});

			it('should have thursday in the 4th column for march 2018 ', () => {
				const calendar = {
					year: 2018,
					monthIndex: 2,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				expect(getFirstRowCellText(wrapper, 4)).toBe('1');
			});

			it('should have sunday in the 7th column for april 2018', () => {
				const calendar = {
					year: 2018,
					monthIndex: 3,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				expect(getFirstRowCellText(wrapper, 7)).toBe('1');
			});
		});


		describe('last date in the correct day column (Monday as first column)', () => {
			function getLastRowCellText(wrapper, column) {
				return wrapper
					.find('.theme-calendar-body-row')
					.last()
					.find('.theme-calendar-item')
					.at(column - 1)
					.find('DayPickerAction')
					.prop('label');
			}

			it('should have monday in the 1st column for april 2018', () => {
				const calendar = {
					year: 2018,
					monthIndex: 3,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				expect(getLastRowCellText(wrapper, 1)).toBe('30');
			});

			it('should have thursday in the 4th column for may 2018', () => {
				const calendar = {
					year: 2018,
					monthIndex: 4,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				expect(getLastRowCellText(wrapper, 4)).toBe('31');
			});

			it('should have sunday in the 7th column for september 2018', () => {
				const calendar = {
					year: 2018,
					monthIndex: 8,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				expect(getLastRowCellText(wrapper, 7)).toBe('30');
			});
		});

		describe('number of weeks displayed', () => {
			function nbOfWeeksRendered(wrapper) {
				return wrapper.find('.theme-calendar-body-row').length;
			}

			it('should have 4 weeks for february 2010', () => {
				const calendar = {
					year: 2010,
					monthIndex: 1,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
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
					currentDate={currentDate}
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
					currentDate={currentDate}
				/>);

				expect(nbOfWeeksRendered(wrapper)).toBe(6);
			});
		});

		describe('contiguous ordered numbers', () => {
			function getDayNumbers(wrapper) {
				return wrapper
					.find('.theme-calendar-body-row .theme-calendar-item')
					.find('DayPickerAction')
					.map(action => action.prop('label'))
					.map(label => parseInt(label, 10));
			}

			function ascSorting(a, b) {
				return a - b;
			}

			it('should have contiguous numbers for july 2018', () => {
				const calendar = {
					year: 2018,
					monthIndex: 6,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				const days = getDayNumbers(wrapper);
				const copy = [...days];
				days.sort(ascSorting);
				expect(days).toEqual(copy);
				expect(days[0]).toBe(1);
				expect(days).toHaveLength(31);
			});

			it('should have contiguous numbers for february 2016', () => {
				const calendar = {
					year: 2016,
					monthIndex: 1,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				const days = getDayNumbers(wrapper);
				const copy = [...days];
				days.sort(ascSorting);
				expect(days).toEqual(copy);
				expect(days[0]).toBe(1);
				expect(days).toHaveLength(29);
			});

			it('should have contiguous numbers for february 2017', () => {
				const calendar = {
					year: 2017,
					monthIndex: 1,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				const days = getDayNumbers(wrapper);
				const copy = [...days];
				days.sort(ascSorting);
				expect(days).toEqual(copy);
				expect(days[0]).toBe(1);
				expect(days).toHaveLength(28);
			});

			it('should have contiguous numbers for november 2022', () => {
				const calendar = {
					year: 2022,
					monthIndex: 10,
				};

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={currentDate}
				/>);

				const days = getDayNumbers(wrapper);
				const copy = [...days];
				days.sort(ascSorting);
				expect(days).toEqual(copy);
				expect(days[0]).toBe(1);
				expect(days).toHaveLength(30);
			});
		});

		describe('current date', () => {
			it('should render specifically the current date', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const date = new Date(2018, 5, 13);

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={date}
				/>);

				const currentDayItems = wrapper
					.find('.theme-calendar-body-row .theme-calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isCurrentDay'));

				expect(currentDayItems).toHaveLength(1);
				const item = currentDayItems.first();
				expect(item.prop('label')).toBe('13');
			});

			it('should not render specifically a date if current date is out of displayed month', () => {
				const calendar = {
					year: 2018,
					monthIndex: 5,
				};

				const date = new Date(2018, 4, 13);

				const wrapper = shallow(<DatePicker
					calendar={calendar}
					currentDate={date}
				/>);

				const currentDayItems = wrapper
					.find('.theme-calendar-body-row .theme-calendar-item DayPickerAction')
					.filterWhere(item => item.prop('isCurrentDay'));

				expect(currentDayItems).toHaveLength(0);
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
				currentDate={currentDate}
			/>);

			const sequenceExpected = sequence.map(day => day[0].toUpperCase());

			const sequenceRendered = wrapper
				.find('.theme-calendar-header-row .theme-calendar-item')
				.map(item => item.text());

			expect(sequenceRendered).toEqual(sequenceExpected);
		});
	});
});
