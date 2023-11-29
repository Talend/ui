/* eslint-disable testing-library/no-container */
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import startOfDay from 'date-fns/start_of_day';
import DateTimePicker from './DateTimePicker.component';
import dateMock from '../../../../../../../mocks/dateMock';

jest.unmock('@talend/design-system');

jest.mock('../../views/DateTimeView', () =>
	jest.fn(props => (
		<div data-testid="DateTimeView" data-props={JSON.stringify(props)}>
			<button onClick={() => props.onTitleClick()}>Select MonthYearView</button>
		</div>
	)),
);
jest.mock('../../views/MonthYearView', () =>
	jest.fn(props => (
		<div data-testid="MonthYearView" data-props={JSON.stringify(props)}>
			<button onClick={() => props.onBackClick()}>Select DateTimeView</button>
		</div>
	)),
);

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
		const props = JSON.parse(screen.getByTestId('DateTimeView').getAttribute('data-props'));
		expect(props.calendar.monthIndex).toBe(4);
		expect(props.calendar.year).toBe(2016);
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
		const props = JSON.parse(screen.getByTestId('DateTimeView').getAttribute('data-props'));
		expect(props.calendar.monthIndex).toBe(0);
		expect(props.calendar.year).toBe(2013);
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

		it('should disable focus when active element is out of picker', async () => {
			// given
			const { container } = render(<DateTimePicker manageFocus onSubmit={() => {}} />);
			container.firstChild.dispatchEvent(new Event('focusin'));
			await waitFor(() => expect(container.firstChild).toHaveAttribute('tabIndex', '0'));
			container.firstChild.dispatchEvent(new Event('focusout'));
			await waitFor(() => expect(container.firstChild).toHaveAttribute('tabIndex', '-1'));
		});

		it('should NOT allow focus when active element is outside of picker', () => {});
	});

	describe('view switching', () => {
		it('should switch state to MonthYearView when header title of DateTimeView is clicked', async () => {
			const user = userEvent.setup();

			// given
			render(<DateTimePicker onSubmit={() => {}} />);

			// when
			await user.click(screen.getByText('Select MonthYearView'));

			// then
			expect(screen.getByText('Select DateTimeView')).toBeVisible();
		});

		it('should switch state to DateTimeView when header back action of MonthYearView is clicked', async () => {
			const user = userEvent.setup();

			// given
			render(<DateTimePicker onSubmit={() => {}} />);
			await user.click(screen.getByText('Select MonthYearView'));
			expect(screen.queryByText('Select MonthYearView')).not.toBeInTheDocument();

			// when
			await user.click(screen.getByText('Select DateTimeView'));
			jest.runAllTimers();

			// then
			expect(screen.queryByText('Select MonthYearView')).toBeVisible();
		});
	});

	describe('date update', () => {
		it('should update state on date props change', () => {
			// given
			const d1 = new Date(2018, 2, 5);
			const d2 = new Date(2019, 11, 21);
			const { rerender } = render(<DateTimePicker selection={{ date: d1 }} onSubmit={() => {}} />);

			// when
			rerender(<DateTimePicker selection={{ date: d2 }} onSubmit={() => {}} />);

			// then
			const props = JSON.parse(screen.getByTestId('DateTimeView').dataset.props);
			expect(props.selectedDate).toEqual(startOfDay(d2).toISOString());
		});

		it('should update state on time props change', () => {
			// given
			const t1 = { hours: 1, minutes: 15 };
			const t2 = { hours: 23, minutes: 25 };
			const onSubmit = jest.fn();
			const { rerender } = render(<DateTimePicker selection={{ time: t1 }} onSubmit={onSubmit} />);

			// when
			rerender(<DateTimePicker selection={{ time: t2 }} onSubmit={() => {}} />);

			// then
			const props = JSON.parse(screen.getByTestId('DateTimeView').dataset.props);
			expect(props.selectedTime).toEqual({
				hours: 23,
				minutes: 25,
			});
		});
	});

	describe('today function', () => {
		it('should switch state to DateTimeView when Today is clicked', async () => {
			const user = userEvent.setup();

			// given
			const today = new Date();
			render(<DateTimePicker onSubmit={() => {}} />);

			// when
			await user.click(screen.getByText('Today'));

			// then
			const props = JSON.parse(screen.getByTestId('DateTimeView').dataset.props);
			expect(props.selectedDate).toEqual(startOfDay(today).toISOString());
		});
	});
});
