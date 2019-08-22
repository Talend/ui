import React from 'react';
import { shallow, mount } from 'enzyme';

import { DateTimeContext } from '../DateTime/Context';
import DateTime from '../DateTime';
import InputDatePicker from './InputDatePicker.component';

describe('InputDatePicker', () => {
	it('should render Input for date', () => {
		const wrapper = shallow(<InputDatePicker id="my-picker" />);

		expect(wrapper.find(DateTime.Input).prop('part')).toBe('date');
	});
	it('should render date picker when focus on Input', () => {
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
				<InputDatePicker id="my-id" />
			</DateTimeContext.Provider>
		);

		// when
		wrapper.simulate('focus');

		// then
		expect(wrapper.find(DateTime.Picker).length).toBe(1);
	});
});
