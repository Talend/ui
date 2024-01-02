import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MonthYearView from './MonthYearView.component';

describe('MonthYearView', () => {
	it('should render', () => {
		jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
		// when
		const { container } = render(
			<MonthYearView
				allowFocus
				onBackClick={jest.fn()}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		jest.useRealTimers();
	});

	it('should manage tabIndex', () => {
		jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
		// given
		const { rerender } = render(
			<MonthYearView
				onBackClick={jest.fn()}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);
		expect(screen.getByLabelText('Switch to date-and-time view')).toHaveAttribute('tabIndex', '-1');

		// when
		rerender(
			<MonthYearView
				onBackClick={jest.fn()}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
				allowFocus
			/>,
		);

		// then
		expect(screen.getByLabelText('Switch to date-and-time view')).toHaveAttribute('tabIndex', '0');
		jest.useRealTimers();
	});

	it('should trigger props.onBackClick', async () => {
		const user = userEvent.setup();

		// given
		const onBackClick = jest.fn();
		render(
			<MonthYearView
				onBackClick={onBackClick}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);
		expect(onBackClick).not.toHaveBeenCalled();

		// when
		await user.click(screen.getByLabelText('Switch to date-and-time view'));

		// then
		expect(onBackClick).toHaveBeenCalled();
	});
});
