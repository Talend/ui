/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateRangeContext } from '../Context';
import Picker from './Picker.component';

describe('DateRange.Picker', () => {
	it('should render', () => {
		// given
		const managerValue = {
			startDate: {
				value: new Date(2007, 0, 2),
			},
			endDate: {
				value: new Date(2007, 1, 2),
			},
			pickerManagement: {
				onStartChange: jest.fn(),
			},
		};

		// when
		const { container } = render(
			<DateRangeContext.Provider value={managerValue}>
				<Picker other="custom props" focusedInput="startDate" />
			</DateRangeContext.Provider>,
		);
		// userEvent.click(screen.getByTestId('CalendarPicker'));

		// then
		expect(screen.getByLabelText('Date picker')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should call manager onSubmit callback on picker submission', async () => {
		// given
		const managerValue = {
			startDate: {
				value: new Date(2007, 0, 2),
			},
			endDate: {
				value: undefined,
			},
			pickerManagement: {
				onStartChange: jest.fn(),
			},
		};

		render(
			<DateRangeContext.Provider value={managerValue}>
				<Picker focusedInput="startDate" />
			</DateRangeContext.Provider>,
		);
		expect(managerValue.pickerManagement.onStartChange).not.toBeCalled();

		// when
		await userEvent.click(screen.getByLabelText('Monday 01 January 2007'));

		// then
		expect(managerValue.pickerManagement.onStartChange).toBeCalled();
	});
});
