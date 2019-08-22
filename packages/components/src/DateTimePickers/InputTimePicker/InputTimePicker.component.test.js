import React from 'react';
import { shallow, mount } from 'enzyme';
import keycode from 'keycode';

import { DateTimeContext } from '../DateTime/Context';
import DateTime from '../DateTime';
import InputTimePicker from './InputTimePicker.component';

describe('InputTimePicker', () => {
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
	it('should render Input for time', () => {
		const wrapper = shallow(<InputTimePicker id="my-picker" />);

		expect(wrapper.find(DateTime.Input).prop('part')).toBe('time');
	});
	it('should render time picker when focus on Input', () => {
		// given
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<InputTimePicker id="my-id" />
			</DateTimeContext.Provider>
		);

		// when
		wrapper.simulate('focus');

		// then
		expect(wrapper.find('TimePicker').length).toBe(1);
	});
	it('should focus on time if it is open with input DOWN', () => {
		// given
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<InputTimePicker id="my-id" />
			</DateTimeContext.Provider>
		);
		wrapper.simulate('focus');
		const event = { keyCode: keycode.codes.down };

		// when
		wrapper
			.find('input')
			.first()
			.simulate('keydown', event);

		// then
		expect(document.activeElement.classList.contains('theme-time')).toBe(true);
	});
});
