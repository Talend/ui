import React from 'react';
import { mount } from 'enzyme';
import ClearBasicSearch from './ClearBasicSearch.component';

describe('BasicSearch', () => {
	it('should render the default html output', () => {
		// Given
		const props = {
			isDisabled: false,
			onClick: jest.fn(),
			t: jest.fn(),
		};
		// When
		const wrapper = mount(<ClearBasicSearch {...props} />);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render the html output with a disabled action', () => {
		// given
		const props = {
			isDisabled: true,
			onClick: jest.fn(),
			t: jest.fn(),
		};
		// when
		const wrapper = mount(<ClearBasicSearch {...props} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
