import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';

import Item from './Item.component';

const item = {
	values: ['toto'],
	itemProps: {
		key: 'values',
		onSubmitItem: jest.fn(), // provided click callback
		onAbortItem: jest.fn(), // provided click callback
		onSelectItem: jest.fn(), // provided click callback
		actions: [{
			label: 'Edit',
			id: 'edit',
			onClick: jest.fn(), // provided click callback
		}, {
			label: 'Delete',
			id: 'delete',
			onClick: jest.fn(), // provided click callback
		}],
	},
};

describe('Item', () => {
	it('should trigger callback on item click', () => {
		// given
		const props = {
			item,
		};

		const itemInstance = <Item {...props} />;

		// when
		const wrapper = mount(itemInstance);
		const checkbox = wrapper.find('[type="checkbox"]');

		checkbox.at(0).simulate('click');

		// then
		expect(props.item.itemProps.onSelectItem).toBeCalled();
	});
});
