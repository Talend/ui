import React from 'react';
import { mount } from 'enzyme';

import InputDateTimePicker from './InputDateTimePicker.component';
import Manager from '../DateTime/Manager';

describe('InputDateTimePicker', () => {
	describe('onChange', () => {
		it('should trigger props.onChange', () => {
			// given
			const onChange = jest.fn();
			const event = { target: { value: '2015-01-15 15:45' } };
			const payload = {
				datetime: new Date(2015, 0, 15, 15, 45),
				origin: 'INPUT',
				textInput: '2015-01-15 15:45',
				errors: [],
				errorMessage: null,
			};
			const wrapper = mount(<InputDateTimePicker id="my-picker" onChange={onChange} useTime />);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find(Manager).prop('onChange')(event, payload);

			// then
			expect(onChange).toBeCalledWith(event, payload);
		});
	});
});
