import React from 'react';
import { mount } from 'enzyme';

import { DateTimeContext } from '../Context';
import Picker from './Picker.component';

describe('DateTime.Picker', () => {
	describe('render', () => {
		// given
		const onDateSubmit = jest.fn();
		const onTimeSubmit = jest.fn();
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
			datePickerManagement: {
				onSubmit: onDateSubmit,
			},
			timePickerManagement: {
				onSubmit: onTimeSubmit,
			},
		};
		it('should render', () => {
			// when
			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<Picker other="custom props" />
				</DateTimeContext.Provider>,
			);

			// then
			const props = wrapper.find('TimePicker').props();
			expect(props.manageFocus).toBe(true);
			expect(props.other).toBe('custom props');
			expect(props.selection).toEqual({
				date: new Date(2007, 0, 2),
				time: { hours: '01', minutes: '02', seconds: '03' },
			});
			expect(props.useSeconds).toBe(true);
			expect(props.useTime).toBe(true);
			expect(props.useUTC).toBe(false);
		});
		it('should render DateTimePicker component when part is date', () => {
			// when
			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<Picker other="custom props" part="date" />
				</DateTimeContext.Provider>,
			);

			// then
			expect(wrapper.find('DateTimePicker').length).toBe(1);
		});
		it('should render TimePicker component when part is time', () => {
			// when
			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<Picker other="custom props" part="time" />
				</DateTimeContext.Provider>,
			);

			// then
			expect(wrapper.find('TimePicker').length).toBe(1);
		});
	});

	describe('on submission', () => {
		it('should call date onSubmit callback on picker submission', () => {
			// given
			const managerValue = {
				datetime: {
					date: new Date(2007, 0, 2),
				},
				datePickerManagement: {
					onSubmit: jest.fn(),
				},
			};

			const onSubmit = jest.fn();

			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<Picker onSubmit={onSubmit} part="date" />
				</DateTimeContext.Provider>,
			);
			expect(managerValue.datePickerManagement.onSubmit).not.toBeCalled();
			expect(onSubmit).not.toBeCalled();

			// when
			wrapper.find('DateTimePicker').prop('onSubmit')();

			// then
			expect(managerValue.datePickerManagement.onSubmit).toBeCalled();
			expect(onSubmit).toBeCalled();
		});
		it('should call time onSubmit callback on picker submission', () => {
			// given
			const managerValue = {
				datetime: {
					date: new Date(2007, 0, 2),
					time: { hours: '01', minutes: '02', seconds: '03' },
				},
				timePickerManagement: {
					onSubmit: jest.fn(),
				},
			};
			const onSubmit = jest.fn();
			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<Picker onSubmit={onSubmit} part="time" />
				</DateTimeContext.Provider>,
			);
			expect(managerValue.timePickerManagement.onSubmit).not.toBeCalled();
			expect(onSubmit).not.toBeCalled();

			// when
			wrapper.find('TimePicker').prop('onSubmit')();

			// then
			expect(managerValue.timePickerManagement.onSubmit).toBeCalled();
			expect(onSubmit).toBeCalled();
		});
	});
});
