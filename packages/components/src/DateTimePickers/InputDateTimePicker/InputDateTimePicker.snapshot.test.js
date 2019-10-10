/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import InputDateTimePicker from './InputDateTimePicker.component';

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
});
