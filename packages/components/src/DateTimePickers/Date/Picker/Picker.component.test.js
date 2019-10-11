import React from 'react';
import { mount } from 'enzyme';

import { DateContext } from '../Context';
import Picker from './Picker.component';

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
		const wrapper = mount(
			<DateContext.Provider value={managerValue}>
				<Picker other="custom props" />
			</DateContext.Provider>,
		);

		// then
		expect(wrapper.find('CalendarPicker').props()).toEqual({
			manageFocus: true,
			onSubmit: managerValue.pickerManagement.onSubmit,
			other: 'custom props',
			selectedDate: new Date(2007, 0, 2),
			useUTC: false,
			t: expect.any(Function),
		});
	});

	it('should call manager onSubmit callback on picker submission', () => {
		// given
		const managerValue = {
			value: {
				date: new Date(2007, 0, 2),
			},
			pickerManagement: {
				onSubmit: jest.fn(),
			},
		};

		const wrapper = mount(
			<DateContext.Provider value={managerValue}>
				<Picker />
			</DateContext.Provider>,
		);
		expect(managerValue.pickerManagement.onSubmit).not.toBeCalled();

		// when
		wrapper.find('CalendarPicker').prop('onSubmit')();

		// then
		expect(managerValue.pickerManagement.onSubmit).toBeCalled();
	});
});
