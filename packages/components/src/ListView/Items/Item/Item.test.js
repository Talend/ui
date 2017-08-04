import React from 'react';
import { mount } from 'enzyme';
import Item from './Item.component';

const item = {
	label: 'toto',
	onChange: jest.fn(),
};

describe('Item', () => {
	it('should trigger callback on item click', () => {
		// given
		const itemInstance = <Item item={item} />;

		// when
		const wrapper = mount(itemInstance);
		const checkbox = wrapper.find('[type="checkbox"]');

		checkbox.at(0).simulate('change');

		// then
		expect(item.onChange).toBeCalled();
	});
});
