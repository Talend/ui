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
				startDateTime={new Date(2019, 11, 1, 0, 0, 0)}
				endDateTime={new Date(2019, 11, 12, 23, 59, 59)}
				useSeconds
			/>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
