import React from 'react';
import { mount } from 'enzyme';
import keycode from 'keycode';

import createInputPicker from './createInputPicker';
import { DateTimeContext } from '../DateTime/Context';

function getOverlay(wrapper) {
	return wrapper.find('Popper').first();
}
describe('InputPicker', () => {
	const managerValue = {
		datetime: {
			textInput: '2007-01-02',
		},
		dateInputManagement: {
			placeholder: 'YYY-MM-DD',
		},
		timeInputManagement: {
			placeholder: 'HH:mm',
		},
	};

	const InputSomethingPicker = createInputPicker({
		part: 'date',
		theme: {},
		Picker: () => <p>popper content</p>,
	});

	describe('focus/blur', () => {
		it('should open picker on focus', () => {
			// given
			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<InputSomethingPicker id="my-id" />
				</DateTimeContext.Provider>);

			expect(getOverlay(wrapper).exists()).toBe(false);

			// when
			wrapper.simulate('focus');

			// then
			expect(getOverlay(wrapper).exists()).toBe(true);
		});

		it('should close picker on blur', () => {
			// given
			jest.useFakeTimers();

			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<InputSomethingPicker id="my-id" />
				</DateTimeContext.Provider>);

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
			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<InputSomethingPicker id="my-id" onBlur={onBlur} />
				</DateTimeContext.Provider>);
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
			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<InputSomethingPicker id="my-id" />
				</DateTimeContext.Provider>);
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
			const wrapper = mount(
				<DateTimeContext.Provider value={managerValue}>
					<InputSomethingPicker id="my-id" />
				</DateTimeContext.Provider>);
			expect(getOverlay(wrapper).exists()).toBe(false);
			const event = { keyCode: keycode.codes.down };

			// when
			wrapper.find('input').simulate('keydown', event);

			// then
			expect(getOverlay(wrapper).exists()).toBe(true);
		});
	});

	it('should NOT close from input change', () => {
		// given
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<InputSomethingPicker id="my-id" />
			</DateTimeContext.Provider>);
		wrapper.simulate('focus');
		expect(getOverlay(wrapper).exists()).toBe(true);

		// when
		wrapper.find('DebounceInput').simulate('change');

		// then
		expect(getOverlay(wrapper).exists()).toBe(true);
	});
});
