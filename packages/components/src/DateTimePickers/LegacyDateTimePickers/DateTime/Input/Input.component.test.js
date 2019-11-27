import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DateTimeContext } from '../Context';
import Input from './Input.component';

describe('DateTime.Input', () => {
	it('should render', () => {
		// given
		const managerValue = {
			errorManagement: {
				inputErrorId: 'inputErrorId',
				onInputFocus: jest.fn(),
			},
			datetime: {
				textInput: '2007-01-02',
			},
			inputManagement: {
				placeholder: 'YYY-MM-DD',
			},
		};

		// when
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<Input aria-labelledby="labelId" />
			</DateTimeContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should call manager focus callback in input focus', () => {
		// given
		const managerValue = {
			errorManagement: {
				onInputFocus: jest.fn(),
			},
			datetime: {
				textInput: '',
			},
		};

		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<Input aria-labelledby="labelId" />
			</DateTimeContext.Provider>,
		);
		expect(managerValue.errorManagement.onInputFocus).not.toBeCalled();

		// when
		wrapper.find('input').simulate('focus');

		// then
		expect(managerValue.errorManagement.onInputFocus).toBeCalled();
	});
});
