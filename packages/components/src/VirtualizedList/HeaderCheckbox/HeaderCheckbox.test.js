import React from 'react';
import { shallow } from 'enzyme';

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
		const wrapper = shallow(<HeaderCheckbox columnData={columnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should trigger onToggleAll callback on checkbox toggle', () => {
		// given
		const event = { target: 'lol' };

		// when
		const wrapper = shallow(<HeaderCheckbox columnData={columnData} />);
		wrapper.find('#myList-header-check').simulate('change', event);

		// then
		expect(columnData.onToggleAll).toBeCalledWith(event);
	});

	it('should render unchecked & disabled checkbox on header when there is no items', () => {
		// when
		const wrapper = shallow(<HeaderCheckbox columnData={{ ...columnData, collection: [] }} />);

		// then
		const checkbox = wrapper.find('#myList-header-check');
		expect(checkbox.prop('checked')).toBe(false);
		expect(checkbox.prop('disabled')).toBe(true);
	});
});
