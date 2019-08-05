/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
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
			onClick: jest.fn(),
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
			onClick: jest.fn(),
		};
		// When
		const wrapper = mount(<Component {...props} />);
		// Then
		expect(wrapper.find('svg[name="talend-locked"]')).toHaveLength(1);
	});
	it('should call the onClick when checkbox trigger change', () => {
		// Given
		const onClick = jest.fn();
		const props = {
			dataFeature: 'my-feature',
			describedby: 'my-div-desc',
			description: 'this is my checkbox',
			id: 'some-id',
			label: 'column-label',
			onClick,
		};
		// When
		const wrapper = mount(<Component {...props} />);
		act(() => wrapper.find('input[type="checkbox"]').simulate('change'));
		// Then
		expect(onClick).toHaveBeenCalled();
		expect(onClick.mock.calls[0][0]).toEqual(false);
	});
});
