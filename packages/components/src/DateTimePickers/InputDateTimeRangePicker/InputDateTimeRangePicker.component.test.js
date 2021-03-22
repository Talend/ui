import React from 'react';
import noop from 'lodash/noop';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import InputDateTimeRangePicker from './InputDateTimeRangePicker.component';
import Manager from '../DateTimeRange/Manager';

describe('InputDateTimeRangePicker', () => {
	it('should render', () => {
		// when
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });
		const wrapper = mount(
			<InputDateTimeRangePicker
				id="my-picker"
				startDateTime="2019-12-01 00:00:00"
				endDateTime="2019-12-11 23:59:59"
				useSeconds
			/>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render with default time', () => {
		// when
		const wrapper = mount(
			<InputDateTimeRangePicker
				id="my-picker"
				defaultTimeStart={{
					hours: '00',
					minutes: '00',
				}}
				defaultTimeEnd={{
					hours: '12',
					minutes: '24',
				}}
			/>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	describe('onChange', () => {
		it('should trigger props.onChange', () => {
			// given
			const payload = {
				startDateTime: new Date(2015, 0, 15, 15, 45),
				endDateTime: new Date(2015, 0, 15, 15, 45),
			};
			const onChange = jest.fn();
			const event = { target: { value: '2015-01-15 15:45' } };
			const wrapper = mount(<InputDateTimeRangePicker id="my-picker" onChange={onChange} />);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find(Manager).prop('onChange')(event, payload);

			// then
			expect(onChange).toBeCalledWith(event, payload);
		});
	});

	describe('should display inline', () => {
		let wrapper = mount(<InputDateTimeRangePicker id="range-picker" onChange={noop} />);
		expect(wrapper.find('div.date-time-range-picker-inline').length).toEqual(0);

		wrapper = mount(
			<InputDateTimeRangePicker id="range-picker" onChange={noop} inline />,
		);
		expect(wrapper.find('div.date-time-range-picker-inline').length).toEqual(1);
	});
});
