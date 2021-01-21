import React from 'react';
import { mount } from 'enzyme';
import Component from './RowCheckbox.component';

describe('RowCheckBox', () => {
	it('should render a checked checkbox input by default', () => {
		// Given
		const props = {
			dataFeature: 'my-feature',
			describedby: 'my-div-desc',
			description: 'this is my checkbox',
			id: 'some-id',
			label: 'column-label',
			onChange: jest.fn(),
		};
		// When
		const wrapper = mount(<Component {...props} />);
		// Then
		expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render a locked item', () => {
		// Given
		const props = {
			dataFeature: 'my-feature',
			describedby: 'my-div-desc',
			description: 'this is my checkbox',
			id: 'some-id',
			label: 'column-label',
			locked: true,
			onChange: jest.fn(),
		};
		// When
		const wrapper = mount(<Component {...props} />);
		// Then
		expect(wrapper.find('svg.tc-icon-name-talend-locked')).toHaveLength(1);
	});
	it('should call the onClick when checkbox trigger change', () => {
		// Given
		const onChange = jest.fn();
		const props = {
			dataFeature: 'my-feature',
			describedby: 'my-div-desc',
			description: 'this is my checkbox',
			id: 'some-id',
			label: 'column-label',
			onChange,
		};
		// When
		const wrapper = mount(<Component {...props} />);
		wrapper.find('input[type="checkbox"]').simulate('change');
		// Then
		expect(onChange).toHaveBeenNthCalledWith(1, false, 'column-label');
	});
});
