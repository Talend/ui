import React from 'react';
import { mount } from 'enzyme';
import keycode from 'keycode';
import cases from 'jest-in-case';

import InputDateTimePicker from './InputDateTimePicker.component';
import Manager from '../DateTime/Manager';

function getOverlay(wrapper) {
	return wrapper.find('.theme-popper').first();
}

describe('InputDateTimePicker', () => {
	describe('focus/blur', () => {
		it('should open picker on focus', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id="my-picker" />);
			expect(getOverlay(wrapper).exists()).toBe(false);

			// when
			wrapper.simulate('focus');

			// then
			expect(getOverlay(wrapper).exists()).toBe(true);
		});

		it('should close picker on blur', () => {
			// given
			jest.useFakeTimers();
			const wrapper = mount(<InputDateTimePicker id="my-picker" />);
			wrapper.simulate('focus');
			expect(getOverlay(wrapper).exists()).toBe(true);

			// when
			wrapper.simulate('blur');
			jest.runAllTimers();
			wrapper.update();

			// then
			expect(getOverlay(wrapper).exists()).toBe(false);
		});

		it('should trigger props.onBlur', () => {
			// given
			jest.useFakeTimers();
			const onBlur = jest.fn();
			const wrapper = mount(<InputDateTimePicker id="my-picker" onBlur={onBlur} />);
			expect(onBlur).not.toBeCalled();

			// when
			wrapper.simulate('blur');
			jest.runAllTimers();

			// then
			expect(onBlur).toBeCalled();
		});
	});

	describe('keydown', () => {
		it('should close the picker and focus on input with ESC', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id="my-picker" />);
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
			const wrapper = mount(<InputDateTimePicker id="my-picker" />);
			expect(getOverlay(wrapper).exists()).toBe(false);
			const event = { keyCode: keycode.codes.down };

			// when
			wrapper.find('input').simulate('keydown', event);

			// then
			expect(getOverlay(wrapper).exists()).toBe(true);
		});

		it('should focus on calendar day if it is open with input DOWN', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id="my-picker" />, { attachTo: document.body });
			wrapper.simulate('focus');
			const event = { keyCode: keycode.codes.down };

			// when
			wrapper.find('input').first().simulate('keydown', event);

			// then
			expect(document.activeElement.classList.contains('tc-date-picker-day')).toBe(true);
		});
	});

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

		cases(
			'from picker',
			({ expectedOverlay, formMode, useTime }) => {
				// given
				const wrapper = mount(
					<InputDateTimePicker
						id="my-picker"
						onChange={jest.fn()}
						formMode={formMode}
						useTime={useTime}
					/>,
				);
				wrapper.simulate('focus');
				expect(getOverlay(wrapper).exists()).toBe(true);

				// when
				wrapper.find('.tc-date-picker-day').first().simulate('click');

				// then
				expect(getOverlay(wrapper).exists()).toBe(expectedOverlay);
			},
			[
				{
					name: 'should close overlay',
					expectedOverlay: false,
					formMode: false,
					useTime: false,
				},
				{
					name: 'should NOT close overlay in form mode',
					expectedOverlay: true,
					formMode: true,
					useTime: false,
				},
				{
					name: 'should NOT close overlay in time mode',
					expectedOverlay: true,
					formMode: false,
					useTime: true,
				},
			],
		);

		it('should NOT close from input change', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id="my-picker" onChange={jest.fn()} />);
			wrapper.simulate('focus');
			expect(getOverlay(wrapper).exists()).toBe(true);

			// when
			wrapper.find('DebounceInput').simulate('change');

			// then
			expect(getOverlay(wrapper).exists()).toBe(true);
		});

		it('should close in form mode submit', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id="my-picker" onChange={jest.fn()} formMode />);
			wrapper.simulate('focus');
			expect(getOverlay(wrapper).exists()).toBe(true);

			// when
			wrapper.find('.tc-date-picker-day').last().simulate('click');
			wrapper.find('form').simulate('submit');

			// then
			expect(getOverlay(wrapper).exists()).toBe(false);
		});
	});
});
