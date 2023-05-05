/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import { DateContext } from '../Context';
import Picker from './Picker.component';

jest.mock('../../pickers/CalendarPicker', () => {
	return props => <div data-testid="CalendarPicker" data-props={JSON.stringify(props)} />;
});

describe('Date.Picker', () => {
	it('should render', () => {
		// given
		const managerValue = {
			value: {
				date: new Date(2007, 0, 2),
			},
			pickerManagement: {
				onSubmit: jest.fn(),
				useUTC: false,
			},
		};

		// when
		render(
			<DateContext.Provider value={managerValue}>
				<Picker other="custom props" />
			</DateContext.Provider>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('CalendarPicker').dataset.props);
		expect(props).toMatchObject({
			manageFocus: true,
			other: 'custom props',
			selectedDate: '2007-01-01T23:00:00.000Z',
			useUTC: false,
		});
	});
});
