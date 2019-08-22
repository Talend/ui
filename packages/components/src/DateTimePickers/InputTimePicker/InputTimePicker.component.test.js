import React from 'react';
import { shallow, mount } from 'enzyme';

import { DateTimeContext } from '../DateTime/Context';
import DateTime from '../DateTime';
import InputTimePicker from './InputTimePicker.component';

describe('InputTimePicker', () => {
	it('should render Input for time', () => {
		const wrapper = shallow(<InputTimePicker id="my-picker" />);

		expect(wrapper.find(DateTime.Input).prop('part')).toBe('time');
	});
	it('should render time picker when focus on Input', () => {
		// given
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

		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<InputTimePicker id="my-id" />
			</DateTimeContext.Provider>
		);

		// when
		wrapper.simulate('focus');

		// then
		expect(wrapper.find(DateTime.TimePicker).length).toBe(1);
	});
});
