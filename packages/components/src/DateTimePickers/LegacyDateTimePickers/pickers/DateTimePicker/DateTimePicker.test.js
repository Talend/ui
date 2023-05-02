import { mount, shallow } from 'enzyme';
// rewrite tests using rtl
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import startOfDay from 'date-fns/start_of_day';
import DateTimePicker from './DateTimePicker.component';
import DateTimeView from '../../views/DateTimeView';
import MonthYearView from '../../views/MonthYearView';
import dateMock from '../../../../../../../mocks/dateMock';

describe('DateTimePicker', () => {
	afterEach(() => {
		dateMock.restore();
	});

	it('should render', () => {
		dateMock.mock(new Date(2018, 5, 12));
		const { container } = render(<DateTimePicker manageFocus={false} onSubmit={() => {}} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should initialize calendar view to current date', () => {
		// given
		dateMock.mock(new Date(2016, 4, 12));

		// when
		render(<DateTimePicker onSubmit={() => {}} />);

		// then
		const current = screen.getByText('12');
		expect(current).toBeVisible();
		expect(current).toHaveClass('theme-today');
	});

	it('should initialize calendar view to date from props', () => {
		// when
		render(
			<DateTimePicker
				selection={{
					date: new Date(2013, 0, 15),
				}}
				onSubmit={() => {}}
			/>,
		);

		// then
		const current = screen.getByText('15');
		expect(current).toBeVisible();
		expect(current).toHaveClass('theme-selected');
	});

	describe('focus management', () => {
		it('should init allow focus state when option is off', () => {
			// when
			const { container } = render(<DateTimePicker manageFocus={false} onSubmit={() => {}} />);

			// then
			expect(container.firstChild).toHaveAttribute('tabIndex', '0');
		});

		it('should disable focus when option is on', () => {
			// when
			const { container } = render(<DateTimePicker manageFocus onSubmit={() => {}} />);

			// then
			expect(container.firstChild).toHaveAttribute('tabIndex', '-1');
		});

		it('should allow focus when active element is in picker', async () => {
			// given
			const { container } = render(<DateTimePicker manageFocus onSubmit={() => {}} />);
			expect(container.firstChild).toHaveAttribute('tabIndex', '-1');

			// when
			// eslint-disable-next-line testing-library/no-container
			container.firstChild.focus();

			// then
			expect(container.firstChild).toHaveAttribute('tabIndex', '0');
		});

		it('should disable focus when active element is out of picker', () => {
			// given
			const wrapper = mount(<DateTimePicker manageFocus onSubmit={() => {}} />);
			wrapper.setState({ allowFocus: true });
			wrapper.getDOMNode().dispatchEvent(new Event('focusout'));

			// then
			expect(wrapper.state('allowFocus')).toBe(false);
		});

		it('should NOT allow focus when active element is outside of picker', () => {});
	});

	describe('view switching', () => {
		it('should switch state to MonthYearView when header title of DateTimeView is clicked', () => {
			// given
			const wrapper = mount(<DateTimePicker onSubmit={() => {}} />);
			wrapper.setState({ isDateTimeView: true });

			// when
			const clickTitleHandler = wrapper.find(DateTimeView).prop('onTitleClick');
			clickTitleHandler();

			// then
			expect(wrapper.state('isDateTimeView')).toBe(false);
		});

		it('should switch state to DateTimeView when header back action of MonthYearView is clicked', () => {
			// given
			const wrapper = mount(<DateTimePicker onSubmit={() => {}} />);
			wrapper.setState({ isDateTimeView: false });

			// when
			const clickBackHandler = wrapper.find(MonthYearView).prop('onBackClick');
			clickBackHandler();

			// then
			expect(wrapper.state('isDateTimeView')).toBe(true);
		});

		it('should switch to new month/year value from day picker', () => {
			// given
			const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);
			wrapper.setState({ isDateTimeView: true, calendar: { monthIndex: 10, year: 2018 } });

			// when
			wrapper.find(DateTimeView).prop('onSelectMonthYear')({ monthIndex: 5, year: 2016 });

			// then`
			const calendar = wrapper.state('calendar');
			expect(calendar.monthIndex).toBe(5);
			expect(calendar.year).toBe(2016);
		});

		it('should switch to new month from monthYear picker', () => {
			// given
			const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);
			wrapper.setState({ isDateTimeView: false, calendar: { monthIndex: 10, year: 2018 } });
			const event = { target: {} };

			// when
			wrapper.find(MonthYearView).prop('onSelectMonth')(event, 5);

			// then`
			const calendar = wrapper.state('calendar');
			expect(calendar.monthIndex).toBe(5);
		});

		it('should switch to new year from monthYear picker', () => {
			// given
			const wrapper = shallow(<DateTimePicker onSubmit={() => {}} />);
			wrapper.setState({ isDateTimeView: false, calendar: { monthIndex: 10, year: 2018 } });
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
			const wrapper = shallow(<DateTimePicker selection={{ date: d1 }} onSubmit={() => {}} />);

			// when
			wrapper.setProps({ selection: { date: d2 } });

			// then
			expect(wrapper.state('selectedDate')).toBe(d2);
		});

		it('should update state on time props change', () => {
			// given
			const t1 = { hours: 1, minutes: 15 };
			const t2 = { hours: 23, minutes: 25 };
			const wrapper = shallow(<DateTimePicker selection={{ time: t1 }} onSubmit={() => {}} />);

			// when
			wrapper.setProps({ selection: { time: t2 } });

			// then
			expect(wrapper.state('selectedTime')).toBe(t2);
		});

		it('should update state and submit on date picked', () => {
			// given
			const initialTime = { hours: 1, minutes: 15 };
			const initialDate = new Date(2015, 10, 18);
			const date = new Date(2018, 2, 5);
			const event = { target: {}, persist() {} };
			const onSubmit = jest.fn();

			const wrapper = shallow(
				<DateTimePicker selection={{ date: initialDate, time: initialTime }} onSubmit={onSubmit} />,
			);

			// when
			wrapper.find(DateTimeView).prop('onSelectDate')(event, date);

			// then
			expect(wrapper.state('selectedDate')).toBe(date);
			expect(onSubmit).toBeCalledWith(event, { date, time: initialTime });
		});

		it('should update state and submit on time picked', () => {
			// given
			const initialTime = { hours: 1, minutes: 15 };
			const initialDate = new Date(2015, 10, 18);
			const time = { hours: 23, minutes: 59 };
			const event = { target: {}, persist() {} };
			const onSubmit = jest.fn();

			const wrapper = shallow(
				<DateTimePicker selection={{ date: initialDate, time: initialTime }} onSubmit={onSubmit} />,
			);

			// when
			wrapper.find(DateTimeView).prop('onSelectTime')(event, time);

			// then
			expect(wrapper.state('selectedTime')).toBe(time);
			expect(onSubmit).toBeCalledWith(event, { date: initialDate, time });
		});
	});

	describe('today function', () => {
		it('should switch state to DateTimeView when Today is clicked', () => {
			// given
			const wrapper = mount(<DateTimePicker onSubmit={() => {}} />);
			wrapper.setState({ isDateTimeView: false });

			// when
			wrapper.find({ label: 'Today' }).at(0).simulate('click');

			// then
			expect(wrapper.state('isDateTimeView')).toBe(true);
			expect(wrapper.state('selectedDate')).toStrictEqual(startOfDay(new Date()));
		});
	});
});
