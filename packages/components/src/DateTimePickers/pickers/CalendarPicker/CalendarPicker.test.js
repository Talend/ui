/* eslint-disable react/prop-types */

/* eslint-disable react/display-name */
// rewrite using rtl
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import startOfDay from 'date-fns/start_of_day';

import dateMock from '../../../../../../mocks/dateMock';
import CalendarPicker from './CalendarPicker.component';

jest.mock('../../views/DateView', () => props => (
	<div data-testid="DateView" data-props={JSON.stringify(props)}>
		<button onClick={e => props.onTitleClick(e)}>onTitleClick</button>
		<button onClick={() => props.onSelectMonthYear({ monthIndex: 1, year: 2019 })}>
			onSelectMonthYear
		</button>
		<button onClick={e => props.onSelectDate(e, new Date(2018, 2, 5))}>onSelectDate</button>
	</div>
));
jest.mock('../../views/MonthYearView', () => props => (
	<div data-testid="MonthYearView" data-props={JSON.stringify(props)}>
		<button onClick={e => props.onBackClick(e)}>onBackClick</button>
		<button onClick={e => props.onSelectMonth(e, 5)}>onSelectMonth</button>
		<button onClick={e => props.onSelectYear(e, 2016)}>onSelectYear</button>
	</div>
));

describe('CalendarPicker', () => {
	afterEach(() => {
		dateMock.restore();
	});

	it('should render', () => {
		dateMock.mock(new Date(2018, 5, 12));
		const { container } = render(<CalendarPicker onSubmit={() => {}} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should initialize calendar view to current date', () => {
		// given
		dateMock.mock(new Date(2016, 4, 12));

		// when
		render(<CalendarPicker onSubmit={() => {}} />);

		// then
		const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
		expect(props.calendar).toEqual({
			monthIndex: 4,
			year: 2016,
		});
	});

	it('should initialize calendar view to date from props', () => {
		// when
		render(<CalendarPicker selectedDate={new Date(2013, 0, 15)} onSubmit={() => {}} />);

		// then
		const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
		expect(props.calendar).toEqual({
			monthIndex: 0,
			year: 2013,
		});
	});

	describe('focus management', () => {
		it('should init allow focus state when option is off', () => {
			// when
			render(<CalendarPicker manageFocus={false} onSubmit={() => {}} />);

			// then
			const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
			expect(props.allowFocus).toBe(true);
			expect(screen.getByLabelText('Date picker')).toHaveAttribute('tabIndex', '0');
		});

		it('should disable focus when option is on', () => {
			// when
			render(<CalendarPicker manageFocus onSubmit={() => {}} />);

			// then
			const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
			expect(props.allowFocus).toBe(false);
			expect(screen.getByLabelText('Date picker')).toHaveAttribute('tabIndex', '-1');
		});

		it('should allow focus when active element is in picker', async () => {
			const user = userEvent.setup();

			// given
			render(<CalendarPicker manageFocus onSubmit={() => {}} />);
			await user.click(screen.getByLabelText('Date picker')); // focus by click

			// then
			expect(screen.getByLabelText('Date picker')).toHaveAttribute('tabIndex', '0');
		});

		it('should disable focus when active element is out of picker', async () => {
			const user = userEvent.setup();

			// given
			render(<CalendarPicker manageFocus onSubmit={() => {}} />);
			await user.click(screen.getByLabelText('Date picker')); // focus by click

			// when
			await user.click(document.body); // focus out of picker

			// then
			expect(screen.getByLabelText('Date picker')).toHaveAttribute('tabIndex', '-1');
		});
	});

	describe('view switching', () => {
		it('should switch state to MonthYearView when header title of DateView is clicked', async () => {
			const user = userEvent.setup();

			// given
			render(<CalendarPicker onSubmit={() => {}} />);

			// when
			await user.click(screen.getByText('onTitleClick'));

			// then
			expect(screen.getByTestId('MonthYearView')).toBeInTheDocument();
			expect(screen.queryByTestId('DateView')).not.toBeInTheDocument();
		});

		it('should switch state to DateView when header back action of MonthYearView is clicked', async () => {
			const user = userEvent.setup();

			// given
			render(<CalendarPicker onSubmit={() => {}} />);
			await user.click(screen.getByText('onTitleClick'));

			// when
			await user.click(screen.getByText('onBackClick'));

			// then
			expect(screen.getByTestId('DateView')).toBeInTheDocument();
			expect(screen.queryByTestId('MonthYearView')).not.toBeInTheDocument();
		});

		it('should switch to new month/year value from day picker', async () => {
			const user = userEvent.setup();

			// given
			render(<CalendarPicker onSubmit={() => {}} />);

			// when
			await user.click(screen.getByText('onSelectMonthYear'));

			// then`
			const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
			expect(props.calendar.monthIndex).toBe(1);
			expect(props.calendar.year).toBe(2019);
		});

		it('should switch to new month from monthYear picker', async () => {
			const user = userEvent.setup();

			// given
			const selectedDate = new Date(2018, 10, 12);
			render(<CalendarPicker onSubmit={() => {}} selectedDate={selectedDate} />);
			await user.click(screen.getByText('onTitleClick'));

			// when
			await user.click(screen.getByText('onSelectMonth'));

			// then
			const props = JSON.parse(screen.getByTestId('MonthYearView').getAttribute('data-props'));
			expect(props.selectedMonthIndex).toBe(5);
		});

		it('should switch to new year from monthYear picker', async () => {
			const user = userEvent.setup();

			// given
			const selectedDate = new Date(2018, 10, 12);
			render(<CalendarPicker onSubmit={() => {}} selectedDate={selectedDate} />);
			await user.click(screen.getByText('onTitleClick'));

			// when
			await user.click(screen.getByText('onSelectYear'));

			// then
			const props = JSON.parse(screen.getByTestId('MonthYearView').getAttribute('data-props'));
			expect(props.selectedYear).toBe(2016);
		});
	});

	describe('date update', () => {
		it('should update state on date props change', () => {
			// given
			const d1 = new Date(2018, 2, 5);
			const d2 = new Date(2019, 11, 21);
			const { rerender } = render(<CalendarPicker selectedDate={d1} onSubmit={() => {}} />);

			// when
			rerender(<CalendarPicker selectedDate={d2} onSubmit={() => {}} />);

			// then
			const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
			expect(props.selectedDate).toBe(d2.toISOString());
		});

		it('should update state and submit on date picked', async () => {
			const user = userEvent.setup();

			// given
			const initialDate = new Date(2015, 10, 18);
			const date = new Date(2018, 2, 5);
			const onSubmit = jest.fn();

			render(<CalendarPicker selectedDate={initialDate} onSubmit={onSubmit} />);

			// when
			await user.click(screen.getByText('onSelectDate'));

			// then
			expect(onSubmit).toHaveBeenCalledWith(expect.anything({ type: 'click' }), { date });
		});
	});

	describe('today function', () => {
		it('should switch state to DateTimeView when Today is clicked', async () => {
			const user = userEvent.setup();

			// given
			render(<CalendarPicker onSubmit={() => {}} />);
			await user.click(screen.getByText('onTitleClick'));

			// when
			await user.click(screen.getByText('Today'));

			// then
			expect(screen.getByTestId('DateView')).toBeInTheDocument();
			const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
			expect(props.selectedDate).toBe(startOfDay(new Date()).toISOString());
		});
	});
	describe('date range', () => {
		it('should initialize calendar of startDate when pick "from" date', () => {
			// when
			render(
				<CalendarPicker
					selectedDate={new Date(2013, 0, 15)}
					endDate={new Date(2013, 1, 2)}
					onSubmit={() => {}}
				/>,
			);

			// then
			const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
			expect(props.calendar).toEqual({
				monthIndex: 0,
				year: 2013,
			});
		});
		it('should initialize calendar of endDate when pick "to" date', () => {
			// when
			render(
				<CalendarPicker
					startDate={new Date(2012, 11, 29)}
					selectedDate={new Date(2013, 0, 15)}
					onSubmit={() => {}}
				/>,
			);

			// then
			const props = JSON.parse(screen.getByTestId('DateView').getAttribute('data-props'));
			expect(props.calendar).toEqual({
				monthIndex: 0,
				year: 2013,
			});
		});
	});
});
