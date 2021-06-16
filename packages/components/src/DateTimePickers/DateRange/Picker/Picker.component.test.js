import React from 'react';
import { mount } from 'enzyme';

import { DateRangeContext } from '../Context';
import Picker from './Picker.component';
import CalendarPicker from '../../pickers/CalendarPicker';

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
		const wrapper = mount(
			<DateRangeContext.Provider value={managerValue}>
				<Picker other="custom props" focusedInput="startDate" />
			</DateRangeContext.Provider>,
		);

		// then
		expect(wrapper.find(CalendarPicker).at(0).props()).toMatchObject({
			manageFocus: true,
			onSubmit: managerValue.pickerManagement.onStartChange,
			other: 'custom props',
			selectedDate: new Date(2007, 0, 2),
			endDate: new Date(2007, 1, 2),
			t: expect.any(Function),
			focusedInput: 'startDate',
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
				onStartChange: jest.fn(),
			},
		};

		const wrapper = mount(
			<DateRangeContext.Provider value={managerValue}>
				<Picker focusedInput="startDate" />
			</DateRangeContext.Provider>,
		);
		expect(managerValue.pickerManagement.onStartChange).not.toBeCalled();

		// when
		wrapper.find(CalendarPicker).prop('onSubmit')();

		// then
		expect(managerValue.pickerManagement.onStartChange).toBeCalled();
	});
});
