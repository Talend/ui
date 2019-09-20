import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DateContext } from '../Context';
import Input from './Input.component';

describe('Date.Input', () => {
	it('should render', () => {
		// given
		const managerValue = {
			value: {
				textInput: '2007-01-02',
			},
			inputManagement: {
				placeholder: 'YYYY-MM-DD',
			},
		};
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });

		// when
		const wrapper = mount(
			<DateContext.Provider value={managerValue}>
				<Input aria-labelledby="labelId" />
			</DateContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
