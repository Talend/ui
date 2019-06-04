import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import HeaderCheckbox from './HeaderCheckbox.component';

const items = [{ id: 1, label: 'item 1' }, { id: 2, label: 'item 2' }];

const columnData = {
	id: 'myList',
	label: 'Select item',
	onToggleAll: jest.fn(),
	isSelected: jest.fn(),
	collection: items,
};

describe('Header "Select All" checkbox', () => {
	it('should render a "Select All" checkbox on header when onToggleAll callback provided', () => {
		// when
		const wrapper = mount(<HeaderCheckbox columnData={columnData} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should trigger onToggleAll callback on checkbox toggle', () => {
		// when
		const wrapper = mount(<HeaderCheckbox columnData={columnData} />);

		wrapper.find('#myList-header-check').simulate('change');

		// then
		expect(columnData.onToggleAll).toHaveBeenCalled();
	});

	it('should render unchecked & disabled checkbox on header when there is no items', () => {
		// when
		const wrapper = mount(<HeaderCheckbox columnData={{ ...columnData, collection: [] }} />);

		// then
		const checkbox = wrapper.find('#myList-header-check');
		expect(checkbox.prop('checked')).toBe(false);
		expect(checkbox.prop('disabled')).toBe(true);
	});
});
