/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateTimeContext } from '../Context';
import Picker from './Picker.component';

jest.mock('../../pickers/DateTimePicker', () => {
	return function DummyDateTimePicker({ getProps, ...props }) {
		return (
			<div data-testid="DateTimePicker" {...props}>
				<button onClick={() => getProps(props)}>getProps</button>
			</div>
		);
	};
});

describe('DateTime.Picker', () => {
	it('should render', async () => {
		// given
		const managerValue = {
			errorManagement: {
				hoursErrorId: 'hoursErrorId',
				minutesErrorId: 'minutesErrorId',
				secondsErrorId: 'secondsErrorId',
				onInputFocus: jest.fn(),
				hasError: () => false,
			},
			datetime: {
				date: new Date(2007, 0, 2),
				time: { hours: '01', minutes: '02', seconds: '03' },
			},
			pickerManagement: {
				onSubmit: jest.fn(),
				useTime: true,
				useSeconds: true,
				useUTC: false,
			},
		};
		const getProps = jest.fn();

		// when
		render(
			<DateTimeContext.Provider value={managerValue}>
				<Picker other="custom props" getProps={getProps} />
			</DateTimeContext.Provider>,
		);
		await userEvent.click(screen.getByText('getProps'));

		// then
		expect(getProps.mock.calls[0][0]).toEqual({
			manageFocus: true,
			onSubmit: managerValue.pickerManagement.onSubmit,
			other: 'custom props',
			selection: {
				date: new Date(2007, 0, 2),
				time: { hours: '01', minutes: '02', seconds: '03' },
			},
			useSeconds: true,
			useTime: true,
			useUTC: false,
		});
	});
});
