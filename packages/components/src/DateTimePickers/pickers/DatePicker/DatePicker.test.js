import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';

import DatePicker from './DatePicker.component';

jest.mock('date-fns/isToday');

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
		const { container } = render(
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
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should highlight today', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };

		// when
		render(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);

		// then
		expect(screen.getAllByRole('button')[0]).not.toHaveClass('theme-today');
		expect(screen.getByText('20')).toHaveClass('theme-today');
	});

	it('should highlight selected date', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const selectedDate = new Date(YEAR, MONTH_INDEX, 12);

		// when
		render(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
				selectedDate={selectedDate}
			/>,
		);

		// then
		expect(screen.getAllByRole('button')[0]).not.toHaveClass('theme-selected');
		expect(screen.getByText('12')).toHaveClass('theme-selected');
	});

	it('should fade disable date', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const isDisabledChecker = getDisabledChecker([new Date(YEAR, MONTH_INDEX, 6)]);

		// when
		render(
			<DatePicker
				calendar={calendar}
				isDisabledChecker={isDisabledChecker}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);

		// then
		expect(screen.getAllByText('6')[0]).toHaveAttribute(
			'aria-label',
			'Date is not allowed, Wednesday 06 June 2018',
		);
		expect(screen.getAllByText('6')[0]).toBeDisabled();
	});

	it('should highlight date range', () => {
		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };

		// when
		render(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
				selectedDate={new Date(2018, 5, 1)}
				endDate={new Date(2018, 5, 3)}
			/>,
		);

		// then
		const startDate = screen.getAllByText('1')[0];
		const startDateTableCell = startDate.closest('td');

		expect(startDate).toHaveClass('theme-selected');
		expect(startDateTableCell).toHaveClass('theme-range-start');

		const endDate = screen.getAllByText('3')[0];
		const endDateTableCell = endDate.closest('td');

		expect(endDate).toHaveClass('theme-selected');
		expect(endDateTableCell).toHaveClass('theme-range-end');

		const middleDate = screen.getAllByText('2')[0];
		const middleDateTableCell = middleDate.closest('td');
		expect(middleDateTableCell).toHaveClass('theme-date-range');
		expect(middleDateTableCell).toHaveClass('theme-range-middle');
	});

	it('should apply range style to startDate when time is not 00:00', () => {
		// given
		const props = {
			calendar: {
				year: 2021,
				monthIndex: 3,
			},
			startDate: new Date(2021, 3, 1, 1, 0, 0), // 2021-04-01 01:00:00
			selectedDate: new Date(2021, 3, 7), // 2021-04-07 00:00:00
			// add the following props to prevent prop type warnings
			onSelect: jest.fn(),
			goToPreviousMonth: jest.fn(),
			goToNextMonth: jest.fn(),
		};

		// when
		render(<DatePicker {...props} />);
		const startDateTableCell = screen.getAllByText('1')[0].closest('td'); // 2021-04-01

		// then
		expect(startDateTableCell).toHaveClass('theme-range-start');
		expect(startDateTableCell).toHaveClass('theme-date-range');
	});

	it('should select date', async () => {
		const user = userEvent.setup();

		// given
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const onSelect = jest.fn();
		render(
			<DatePicker
				calendar={calendar}
				onSelect={onSelect}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);
		expect(onSelect).not.toHaveBeenCalled();

		// when
		await user.click(screen.getAllByText('1')[0]);

		// then
		expect(onSelect).toHaveBeenCalledWith(expect.anything(), new Date(YEAR, MONTH_INDEX, 1));
	});

	it('should manage tabIndex', () => {
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		const { rerender } = render(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);
		expect(screen.getAllByRole('button')[0]).toHaveAttribute('tabIndex', '-1');

		// when
		rerender(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
				allowFocus
			/>,
		);

		// then
		expect(screen.getAllByRole('button')[0]).toHaveAttribute('tabIndex', '-1');
		expect(screen.getAllByText('1')[0]).toHaveAttribute('tabIndex', '0');
	});

	it('should have 6 weeks', () => {
		const calendar = { year: YEAR, monthIndex: MONTH_INDEX };
		render(
			<DatePicker
				calendar={calendar}
				onSelect={jest.fn()}
				goToPreviousMonth={jest.fn()}
				goToNextMonth={jest.fn()}
			/>,
		);
		expect(screen.getAllByRole('row')).toHaveLength(7); // 6 weeks + header
		expect(screen.getAllByRole('button')).toHaveLength(6 * 7);
	});

	it('should go to next month if select a date of next month', async () => {
		const user = userEvent.setup();

		const year = 2019;
		const monthIndex = 11;
		const calendar = { year, monthIndex };

		const props = {
			calendar,
			onSelect: jest.fn(),
			goToPreviousMonth: jest.fn(),
			goToNextMonth: jest.fn(),
		};
		render(<DatePicker {...props} />);
		await user.click(screen.getAllByText('4')[1]);
		const selectedDate = new Date(year + 1, 0, 4);
		expect(props.onSelect).toHaveBeenCalledWith(expect.anything(), selectedDate);
		expect(props.goToNextMonth).toHaveBeenCalled();
		expect(props.goToPreviousMonth).not.toHaveBeenCalled();
	});
});
