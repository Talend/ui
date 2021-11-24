/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import InputDateTimePicker from './InputDateTimePicker.component';

const Mock = ({ className }) => <div className={className} />;
jest.mock('../DateTime/Picker', () => props => <Mock className="PickerMock" {...props} />);
jest.mock('../DateTime/Validation', () => props => <Mock className="ValidationMock" {...props} />);
jest.mock('../DateTime/Input', () => props => <Mock className="InputMock" {...props} />);

describe('InputDateTimePicker', () => {
	it('should render', () => {
		// when
		const wrapper = mount(
			<InputDateTimePicker
				id="my-picker"
				selectedDateTime={new Date(2017, 3, 4, 15, 27)}
				useTime
				useSeconds
			/>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
