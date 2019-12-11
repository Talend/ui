import React from 'react';
import { mount } from 'enzyme';

import InputDateTimeRangePicker from './InputDateTimeRangePicker.component';
import Manager from '../DateTimeRange/Manager';

describe('InputDateTimeRangePicker', () => {
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
});
