/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { ColumnChooserProvider } from '../../columnChooser.context';
import getDefaultT from '../../../../../../translate';

import Component from './RowCheckbox.component';

// eslint-disable-next-line react/prop-types
const RowCheckboxWithContext = ({ onChangeVisibility, id, t = getDefaultT(), ...rest }) => (
	<ColumnChooserProvider
		value={{
			onChangeVisibility,
			id,
			t,
		}}
	>
		<Component {...rest} />
	</ColumnChooserProvider>
);

describe('RowVisibilityCheckbox', () => {
	it('should render a checked checkbox input by default', () => {
		// Given
		const index = 0;
		// When
		const wrapper = mount(<RowCheckboxWithContext index={index} />);
		// Then
		expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
		expect(wrapper.find('input[type="checkbox"]').prop('value')).toEqual(true);
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render a non checked checked box input', () => {
		// Given
		const index = 0;
		const value = false;
		// When
		const wrapper = mount(<RowCheckboxWithContext index={index} value={value} />);
		// Then
		expect(wrapper.find('input[type="checkbox"]').prop('value')).toEqual(true);
	});
	it('should render a locked icon', () => {
		// Given
		const index = 0;
		const locked = true;
		// When
		const wrapper = mount(<RowCheckboxWithContext index={index} locked={locked} />);
		// Then
		expect(wrapper.find('svg').prop('name')).toEqual('talend-locked');
	});
	it('should call the onChangeVisibility when checkbox change and send the negate value', () => {
		// Given
		const index = 0;
		const onChangeVisibility = jest.fn();
		const value = false;
		// When
		const wrapper = mount(
			<RowCheckboxWithContext index={index} onChangeVisibility={onChangeVisibility} />,
		);
		act(() => {
			wrapper.find('input').simulate('change');
		});
		// Then
		expect(onChangeVisibility.mock.calls.length).toBe(1);
		expect(onChangeVisibility.mock.calls[0][0]).toBe(index);
		expect(onChangeVisibility.mock.calls[0][1]).toBe(!value);
	});
});
