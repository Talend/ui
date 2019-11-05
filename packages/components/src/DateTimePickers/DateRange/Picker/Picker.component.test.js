import React from 'react';
import { mount } from 'enzyme';

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
				onSubmit: jest.fn(),
			},
			inputManagement: {
				focusedInput: 'startDate',
			},
		};

		// when
		const wrapper = mount(
			<DateRangeContext.Provider value={managerValue}>
				<Picker other="custom props" />
			</DateRangeContext.Provider>,
		);

		// then
		expect(
			wrapper
				.find('CalendarPicker')
				.at(0)
				.props(),
		).toEqual({
			manageFocus: true,
			onSubmit: managerValue.pickerManagement.onSubmit,
			other: 'custom props',
			selectedDate: new Date(2007, 0, 2),
			endDate: new Date(2007, 1, 2),
			t: expect.any(Function),
		});
	});

	it('should call manager onSubmit callback on picker submission', () => {
		// given
		const managerValue = {
			startDate: {
				value: new Date(2007, 0, 2),
			},
			endDate: {
				value: undefined,
			},
			pickerManagement: {
				onSubmit: jest.fn(),
			},
			inputManagement: {
				focusedInput: 'startDate',
			},
		};

		const wrapper = mount(
			<DateRangeContext.Provider value={managerValue}>
				<Picker />
			</DateRangeContext.Provider>,
		);
		expect(managerValue.pickerManagement.onSubmit).not.toBeCalled();

		// when
		wrapper.find('CalendarPicker').prop('onSubmit')();

		// then
		expect(managerValue.pickerManagement.onSubmit).toBeCalled();
	});
});
