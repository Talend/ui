/* eslint-disable react/display-name */
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

import DateView from './DateView.component';

jest.mock('../../pickers/DatePicker', () => props => (
	<div data-testid="DatePicker" data-props={JSON.stringify(props)} />
));
jest.unmock('@talend/design-system');

describe('DateView', () => {
	it('should render', () => {
		// when
		const { container } = render(
			<DateView
				allowFocus
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onTitleClick={jest.fn()}
				onSelectMonthYear={jest.fn()}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
				selectedTime={{ hours: '15', minutes: '45' }}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should trigger props.onTitleClick when title is clicked', () => {
		// given
		const onTitleClick = jest.fn();
		render(
			<DateView
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onSelectMonthYear={jest.fn()}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
				onTitleClick={onTitleClick}
			/>,
		);
		expect(onTitleClick).not.toHaveBeenCalled();

		// when
		userEvent.click(screen.getByLabelText('Switch to month-and-year view'));

		// then
		expect(onTitleClick).toHaveBeenCalled();
	});

	it('should manage tabIndex', () => {
		// given
		const { rerender } = render(
			<DateView
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onSelectMonthYear={jest.fn()}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
				onTitleClick={jest.fn()}
			/>,
		);
		expect(screen.getByLabelText('Switch to month-and-year view')).toHaveAttribute(
			'tabIndex',
			'-1',
		);

		// when
		rerender(
			<DateView
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onSelectMonthYear={jest.fn()}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
				onTitleClick={jest.fn()}
				allowFocus
			/>,
		);

		// then
		expect(screen.getByLabelText('Switch to month-and-year view')).toHaveAttribute('tabIndex', '0');
	});

	test.each([
		{
			name: 'should go to previous month within same year',
			calendar: { monthIndex: 5, year: 2006 },
			button: 'previous',
			expectedMonthYear: { monthIndex: 4, year: 2006 },
		},
		{
			name: 'should go to next month within same year',
			calendar: { monthIndex: 5, year: 2006 },
			button: 'next',
			expectedMonthYear: { monthIndex: 6, year: 2006 },
		},
		{
			name: 'should go from january to previous month',
			calendar: { monthIndex: 0, year: 2006 },
			button: 'previous',
			expectedMonthYear: { monthIndex: 11, year: 2005 },
		},
		{
			name: 'should go from december to next month',
			calendar: { monthIndex: 11, year: 2006 },
			button: 'next',
			expectedMonthYear: { monthIndex: 0, year: 2007 },
		},
	])('$name', ({ calendar, button, expectedMonthYear }) => {
		// given
		const onSelectMonthYear = jest.fn();
		render(
			<DateView
				calendar={calendar}
				onTitleClick={jest.fn()}
				onSelectMonthYear={onSelectMonthYear}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
			/>,
		);
		expect(onSelectMonthYear).not.toHaveBeenCalled();

		// when
		if (button === 'previous') {
			userEvent.click(screen.getByLabelText('Go to previous month'));
		} else if (button === 'next') {
			userEvent.click(screen.getByLabelText('Go to next month'));
		}

		// then
		expect(onSelectMonthYear).toHaveBeenCalledWith(expectedMonthYear, undefined);
	});
});
