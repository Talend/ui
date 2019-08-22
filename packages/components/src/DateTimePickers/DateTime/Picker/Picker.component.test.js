import React from 'react';
import { mount } from 'enzyme';

import { DateTimeContext } from '../Context';
import Picker from './Picker.component';

describe('DateTime.Picker', () => {
	it('should render', () => {
		// given
		const managerValue = {
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

		// when
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<Picker other="custom props" />
			</DateTimeContext.Provider>,
		);

		// then
		const props = wrapper.find('DateTimePicker').props();
		expect(props.manageFocus).toBe(true);
		expect(props.other).toBe('custom props');
		expect(props.selection).toEqual({
			date: new Date(2007, 0, 2),
		});
		expect(props.useSeconds).toBe(true);
		expect(props.useTime).toBe(true);
		expect(props.useUTC).toBe(false);
	});

	it('should call manager onSubmit callback on picker submission', () => {
		// given
		const managerValue = {
			datetime: {
				date: new Date(2007, 0, 2),
				time: { hours: '01', minutes: '02', seconds: '03' },
			},
			datePickerManagement: {
				onSubmit: jest.fn(),
			},
		};

		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<Picker onSubmit={jest.fn()} />
			</DateTimeContext.Provider>,
		);
		expect(managerValue.datePickerManagement.onSubmit).not.toBeCalled();

		// when
		wrapper.find('DateTimePicker').prop('onSubmit')();

		// then
		expect(managerValue.datePickerManagement.onSubmit).toBeCalled();
	});
});
