import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import getDefaultT from '../../../../../translate';
import Component from './SelectAllColumnsCheckbox.component';

describe('SelectAllColumnsCheckbox', () => {
	it('should render by default', () => {
		// given
		const props = {
			id: 'select-all-id',
			onChange: jest.fn(),
			t: getDefaultT(),
		};
		// when
		const wrapper = mount(<Component {...props} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should call the onSelectAll when onChange is triggered on the column chooser table', () => {
		// Given
		const onChange = jest.fn();
		const props = {
			id: 'select-all-id',
			onChange,
			value: true,
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(<Component {...props} />);
		expect(wrapper.find('input#select-all-id-checkbox-Select-All').prop('checked')).toBe(true);
		act(() => {
			wrapper.find('input#select-all-id-checkbox-Select-All').simulate('change');
		});
		wrapper.update();
		// Then
		expect(onChange).toHaveBeenNthCalledWith(1, true, 'Select All');
	});
});
