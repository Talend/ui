import React from 'react';
import { mount } from 'enzyme';
import Component from './RowLabel.component';

describe('RowLabel', () => {
	it('should render the props label', () => {
		// Given
		const label = 'Hello world';
		// When
		const wrapper = mount(<Component label={label} />);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
