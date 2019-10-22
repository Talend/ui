import React from 'react';
import { mount, shallow } from 'enzyme';
import startOfDay from 'date-fns/start_of_day';
import CalendarPicker from './CalendarPicker.component';
import DateView from '../../views/DateView';
import MonthYearView from '../../views/MonthYearView';

describe('CalendarPicker', () => {
	afterEach(() => {
		global.dateMock.restore();
	});

	it('should render', () => {
		global.dateMock.mock(new Date(2018, 5, 12));
		const wrapper = shallow(<CalendarPicker onSubmit={() => {}} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should initialize calendar view to current date', () => {
		// given
		global.dateMock.mock(new Date(2016, 4, 12));

		// when
		const wrapper = shallow(<CalendarPicker onSubmit={() => {}} />);

		// then
		const dateView = wrapper.find(DateView);
		expect(dateView.prop('calendar')).toEqual({
			monthIndex: 4,
			year: 2016,
		});
	});

	it('should initialize calendar view to date from props', () => {
		// when
		const wrapper = shallow(
			<CalendarPicker selectedDate={new Date(2013, 0, 15)} onSubmit={() => {}} />,
		);

		// then
		expect(wrapper.state('calendar')).toEqual({
			monthIndex: 0,
			year: 2013,
		});
	});

	describe('focus management', () => {
		it('should init allow focus state when option is off', () => {
			// when
			const wrapper = mount(<CalendarPicker manageFocus={false} onSubmit={() => {}} />);

			// then
			expect(wrapper.state('allowFocus')).toBe(true);
		});

		it('should disable focus when option is on', () => {
			// when
			const wrapper = mount(<CalendarPicker manageFocus onSubmit={() => {}} />);

			// then
			expect(wrapper.state('allowFocus')).toBe(false);
		});

		it('should allow focus when active element is in picker', () => {
			// given
			const wrapper = mount(<CalendarPicker manageFocus onSubmit={() => {}} />);
			expect(wrapper.state('allowFocus')).toBe(false);
			wrapper.getDOMNode().dispatchEvent(new Event('focusin'));

			// then
			expect(wrapper.state('allowFocus')).toBe(true);
		});

		it('should disable focus when active element is out of picker', () => {
			// given
			const wrapper = mount(<CalendarPicker manageFocus onSubmit={() => {}} />);
			wrapper.setState({ allowFocus: true });
			wrapper.getDOMNode().dispatchEvent(new Event('focusout'));

			// then
			expect(wrapper.state('allowFocus')).toBe(false);
		});

		it('should NOT allow focus when active element is outside of picker', () => {});
	});

	describe('view switching', () => {
		it('should switch state to MonthYearView when header title of DateView is clicked', () => {
			// given
			const wrapper = mount(<CalendarPicker onSubmit={() => {}} />);
			wrapper.setState({ isDateView: true });

			// when
			const clickTitleHandler = wrapper.find(DateView).prop('onTitleClick');
			clickTitleHandler();

			// then
			expect(wrapper.state('isDateView')).toBe(false);
		});

		it('should switch state to DateView when header back action of MonthYearView is clicked', () => {
			// given
			const wrapper = mount(<CalendarPicker onSubmit={() => {}} />);
			wrapper.setState({ isDateView: false });

			// when
			const clickBackHandler = wrapper.find(MonthYearView).prop('onBackClick');
			clickBackHandler();

			// then
			expect(wrapper.state('isDateView')).toBe(true);
		});

		it('should switch to new month/year value from day picker', () => {
			// given
			const wrapper = shallow(<CalendarPicker onSubmit={() => {}} />);
			wrapper.setState({ isDateView: true, calendar: { monthIndex: 10, year: 2018 } });

			// when
			wrapper.find(DateView).prop('onSelectMonthYear')({ monthIndex: 5, year: 2016 });

			// then`
			const calendar = wrapper.state('calendar');
			expect(calendar.monthIndex).toBe(5);
			expect(calendar.year).toBe(2016);
		});

		it('should switch to new month from monthYear picker', () => {
			// given
			const wrapper = shallow(<CalendarPicker onSubmit={() => {}} />);
			wrapper.setState({ isDateView: false, calendar: { monthIndex: 10, year: 2018 } });
			const event = { target: {} };

			// when
			wrapper.find(MonthYearView).prop('onSelectMonth')(event, 5);

			// then`
			const calendar = wrapper.state('calendar');
			expect(calendar.monthIndex).toBe(5);
		});

		it('should switch to new year from monthYear picker', () => {
			// given
			const wrapper = shallow(<CalendarPicker onSubmit={() => {}} />);
			wrapper.setState({ isDateView: false, calendar: { monthIndex: 10, year: 2018 } });
			const event = { target: {} };

			// when
			wrapper.find(MonthYearView).prop('onSelectYear')(event, 2016);

			// then
			const calendar = wrapper.state('calendar');
			expect(calendar.year).toBe(2016);
		});
	});

	describe('date update', () => {
		it('should update state on date props change', () => {
			// given
			const d1 = new Date(2018, 2, 5);
			const d2 = new Date(2019, 11, 21);
			const wrapper = shallow(<CalendarPicker selection={{ date: d1 }} onSubmit={() => {}} />);

			// when
			wrapper.setProps({ selectedDate: d2 });

			// then
			expect(wrapper.state('selectedDate')).toBe(d2);
		});

		it('should update state and submit on date picked', () => {
			// given
			const initialDate = new Date(2015, 10, 18);
			const date = new Date(2018, 2, 5);
			const event = { target: {}, persist() {} };
			const onSubmit = jest.fn();

			const wrapper = shallow(
				<CalendarPicker selection={{ date: initialDate }} onSubmit={onSubmit} />,
			);

			// when
			wrapper.find(DateView).prop('onSelectDate')(event, date);

			// then
			expect(wrapper.state('selectedDate')).toBe(date);
			expect(onSubmit).toBeCalledWith(event, { date });
		});
	});

	describe('today function', () => {
		it('should switch state to DateTimeView when Today is clicked', () => {
			// given
			const wrapper = mount(<CalendarPicker onSubmit={() => {}} />);
			wrapper.setState({ isDateView: false });

			// when
			wrapper
				.find({ label: 'Today' })
				.at(0)
				.simulate('click');

			// then
			expect(wrapper.state('isDateView')).toBe(true);
			expect(wrapper.state('selectedDate')).toStrictEqual(startOfDay(new Date()));
		});
	});
	describe('date range', () => {
		it('should initialize calendar of startDate when pick "from" date', () => {
			// when
			const wrapper = shallow(
				<CalendarPicker
					startDate={new Date(2013, 0, 15)}
					endDate={new Date(2013, 1, 2)}
					onSubmit={() => {}}
					from
				/>,
			);

			// then
			expect(wrapper.state('calendar')).toEqual({
				monthIndex: 0,
				year: 2013,
			});
		});
		it('should initialize calendar of endDate when pick "to" date', () => {
			// when
			const wrapper = shallow(
				<CalendarPicker
					startDate={new Date(2012, 11, 29)}
					endDate={new Date(2013, 0, 15)}
					onSubmit={() => {}}
					to
				/>,
			);

			// then
			expect(wrapper.state('calendar')).toEqual({
				monthIndex: 0,
				year: 2013,
			});
		});
	});
});
