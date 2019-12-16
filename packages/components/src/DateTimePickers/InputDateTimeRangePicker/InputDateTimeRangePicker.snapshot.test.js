/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import InputDateTimeRangePicker from './InputDateTimeRangePicker.component';

describe('InputDateTimeRangePicker', () => {
	it('should render', () => {
		// when
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });
		const wrapper = mount(
			<InputDateTimeRangePicker
				id="my-picker"
				startDateTime="2019-12-01 00:00:00"
				endDateTime="2019-12-11 23:59:59"
				useSeconds
			/>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
