/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonIcon } from '@talend/design-system';

import DateTimeView from './DateTimeView.component';

jest.unmock('@talend/design-system');
jest.mock('../../pickers/DatePicker', () => props => (
	<div data-testid="DatePicker" data-props={JSON.stringify(props)} />
));
jest.mock('../../pickers/TimePicker', () => props => (
	<div data-testid="TimePicker" data-props={JSON.stringify(props)} />
));

function getActions(wrapper) {
	return wrapper.find('ViewLayout').shallow().find(ButtonIcon);
}

function clickOnPreviousMonth(wrapper) {
	getActions(wrapper).first().simulate('click');
}

function clickOnNextMonth(wrapper) {
	getActions(wrapper).last().simulate('click');
}

describe('DateTimeView', () => {
	it('should render', () => {
		// when
		const { container } = render(
			<DateTimeView
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
				useTime
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByTestId('DatePicker')).toBeVisible();
		expect(screen.getByTestId('TimePicker')).toBeVisible();
	});

	it('should render without timePicker', () => {
		// when
		render(
			<DateTimeView
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
		expect(screen.queryByTestId('TimePicker')).not.toBeInTheDocument();
	});

	it('should trigger props.onTitleClick when title is clicked', () => {
		// given
		const onTitleClick = jest.fn();
		render(
			<DateTimeView
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
		expect(onTitleClick).not.toBeCalled();

		// when
		userEvent.click(screen.getByText('June 2006'));

		// then
		expect(onTitleClick).toBeCalled();
	});

	it('should manage tabIndex', () => {
		// given
		const { rerender } = render(
			<DateTimeView
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
		expect(screen.getByText('June 2006').parentElement).toHaveAttribute('tabIndex', '-1');

		// when
		rerender(
			<DateTimeView
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
		expect(screen.getByText('June 2006').parentElement).toHaveAttribute('tabIndex', '0');
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
			<DateTimeView
				calendar={calendar}
				onTitleClick={jest.fn()}
				onSelectMonthYear={onSelectMonthYear}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
			/>,
		);
		expect(onSelectMonthYear).not.toBeCalled();

		// when
		if (button === 'previous') {
			userEvent.click(screen.getByLabelText('Go to previous month'));
		} else if (button === 'next') {
			userEvent.click(screen.getByLabelText('Go to next month'));
		}

		// then
		expect(onSelectMonthYear).toBeCalledWith(expectedMonthYear, undefined);
	});
});
