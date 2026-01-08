import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isSameDay } from 'date-fns/isSameDay';
import { isToday } from 'date-fns/isToday';

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
	const MONTH_INDEX = 5; // month July

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
		expect(screen.getByText('12')).toHaveClass('theme-selected');
	});

	it('should disable date be a disabled button', () => {
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
		expect(screen.getAllByText('6')[0]).toBeDisabled();
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
		expect(screen.getAllByText('1')[0]).toHaveAttribute('tabIndex', '-1');

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
		expect(screen.getAllByRole('button')).toHaveLength(6 * 7);
	});

	it('should go to next month if select a date of next month', async () => {
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
		await userEvent.click(screen.getByLabelText('Saturday 04 January 2020'));
		expect(props.onSelect).toHaveBeenCalledWith(expect.anything(), new Date(year + 1, 0, 4));
		expect(props.goToNextMonth).toHaveBeenCalled();
		expect(props.goToPreviousMonth).not.toHaveBeenCalled();
	});
});
