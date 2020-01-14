import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import InputDateTimePicker from './InputDateTimePicker.component';
import Manager from '../DateTime/Manager';

describe('InputDateTimePicker', () => {
	it('should render', () => {
		// when
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });
		const wrapper = mount(
			<InputDateTimePicker
				id="my-picker"
				selectedDateTime={new Date(2017, 3, 4, 15, 27)}
				useSeconds
			/>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	describe('onChange', () => {
		it('should trigger props.onChange', () => {
			// given
			const onChange = jest.fn();
			const event = { target: { value: '2015-01-15 15:45' } };
			const payload = {
				datetime: new Date(2015, 0, 15, 15, 45),
				textInput: '2015-01-15 15:45',
				errors: [],
				errorMessage: null,
			};
			const wrapper = mount(<InputDateTimePicker id="my-picker" onChange={onChange} />);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find(Manager).prop('onChange')(event, payload);

			// then
			expect(onChange).toBeCalledWith(event, payload);
		});
	});
});
