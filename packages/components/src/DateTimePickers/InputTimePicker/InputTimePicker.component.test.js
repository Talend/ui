import React from 'react';
import { mount } from 'enzyme';
import keycode from 'keycode';

import Time from '../Time';
import InputTimePicker from './InputTimePicker.component';

function getOverlay(wrapper) {
	return wrapper.find('Popper').first();
}

describe('InputTimePicker', () => {
	describe('focus/blur', () => {
		it('should open picker on focus', () => {
			// given
			const wrapper = mount(<InputTimePicker id="my-picker" />);
			expect(getOverlay(wrapper).exists()).toBe(false);

			// when
			wrapper.simulate('focus');

			// then
			expect(getOverlay(wrapper).exists()).toBe(true);
		});
		it('should close picker on blur', () => {
			// given
			jest.useFakeTimers();
			const wrapper = mount(<InputTimePicker id="my-picker" />);
			wrapper.simulate('focus');
			expect(getOverlay(wrapper).exists()).toBe(true);

			// when
			wrapper.simulate('blur');
			jest.runAllTimers();
			wrapper.update();

			// then
			expect(getOverlay(wrapper).exists()).toBe(false);
		});
	});
	describe('on change', () => {
		it('should trigger props.onChange', () => {
			// given
			const onChange = jest.fn();
			const event = { target: { value: '15:45' } };
			const payload = {
				time: { hours: 15, minutes: 45, seconds: 0 },
				origin: 'INPUT',
				textInput: '15:45',
				errors: [],
				errorMessage: null,
			};
			const wrapper = mount(<InputTimePicker id="my-picker" onChange={onChange} />);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find(Time.Manager).prop('onChange')(event, payload);

			// then
			expect(onChange).toBeCalledWith(event, payload);
		});

		it('should close overlay', () => {
			// given
			const wrapper = mount(<InputTimePicker id="my-picker" onChange={jest.fn()} />);
			wrapper.simulate('focus');
			expect(getOverlay(wrapper).exists()).toBe(true);

			// when
			wrapper
				.find('button[role="listitem"]')
				.first()
				.simulate('click');

			// then
			expect(getOverlay(wrapper).exists()).toBe(false);
		});

		it('should NOT close from input change', () => {
			// given
			const wrapper = mount(<InputTimePicker id="my-picker" onChange={jest.fn()} />);
			wrapper.simulate('focus');
			expect(getOverlay(wrapper).exists()).toBe(true);

			// when
			wrapper.find('DebounceInput').simulate('change');

			// then
			expect(getOverlay(wrapper).exists()).toBe(true);
		});
	});
	describe('keydown', () => {
		it('should close the picker and focus on input with ESC', () => {
			// given
			const wrapper = mount(<InputTimePicker id="my-picker" />);
			wrapper.simulate('focus');
			expect(getOverlay(wrapper).exists()).toBe(true);
			const event = { keyCode: keycode.codes.esc };

			// when
			wrapper.simulate('keydown', event);

			// then
			expect(getOverlay(wrapper).exists()).toBe(false);
		});

		it('should open picker if it is closed with DOWN on input', () => {
			// given
			const wrapper = mount(<InputTimePicker id="my-picker" />);
			expect(getOverlay(wrapper).exists()).toBe(false);
			const event = { keyCode: keycode.codes.down };

			// when
			wrapper.find('input').simulate('keydown', event);

			// then
			expect(getOverlay(wrapper).exists()).toBe(true);
		});

		it('should focus on time option if it is open with input DOWN', () => {
			// given
			const wrapper = mount(<InputTimePicker id="my-picker" />);
			wrapper.simulate('focus');
			const event = { keyCode: keycode.codes.down };

			// when
			wrapper
				.find('input')
				.first()
				.simulate('keydown', event);

			// then
			expect(document.activeElement.classList.contains('tc-time-picker-time')).toBe(true);
		});
	});
});
