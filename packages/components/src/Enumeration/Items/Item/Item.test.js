import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';

import Item from './Item.component';

const item = {
	id: 1,
	values: ['toto'],
    itemProps: {
        key: 'values',
        onSubmitItem: jest.fn(), // provided click callback
        onAbortItem: jest.fn(), // provided click callback
        actions: [{
            label: 'Edit',
            id: 'edit',
            onClick: jest.fn(), // provided click callback
        }, {
            label: 'Delete',
            id: 'delete',
            onClick: jest.fn(), // provided click callback
        }]
    },
};

describe('Item', () => {
	it('should display value with two buttons and trigger callback on button title click', () => {
		// given
		const props = {
			item: item,
		};
		const itemInstance = <Item {...props} />;

		// when
		const wrapper = mount(itemInstance);
		const buttons = wrapper.find(Button);

		buttons.at(1).simulate('click', { stopPropagation: () => {} });

		// then
		expect(buttons.length).toBe(2);
		expect(props.item.itemProps.actions[1].onClick).toBeCalled();
	});
});
