import React from 'react';
import { mount } from 'enzyme';
import ActionDropdown from './ActionDropdown.component';

describe('ActionDropdown', () => {
	it('should call onSelect callback when click on item', () => {
		// given
		const onSelectClick = jest.fn();
		const props = {
			id: 'dropdwon-id',
			label: 'Dropdown',
			onSelect: onSelectClick,
			items: [
				{ id: 'item1', label: 'Item 1' },
				{ id: 'item2', label: 'Item 2' },
			],
		};
		const actionDropdownInstance = mount(<ActionDropdown {...props} />);

		// when
		actionDropdownInstance.find('MenuItem').at(0).find('SafeAnchor').simulate('click');

		// then
		expect(onSelectClick).toBeCalledWith(jasmine.anything(), props.items[0]);

		// when
		actionDropdownInstance.find('MenuItem').at(1).find('SafeAnchor').simulate('click');

		// then
		expect(onSelectClick).toBeCalledWith(jasmine.anything(), props.items[1]);
	});
});
