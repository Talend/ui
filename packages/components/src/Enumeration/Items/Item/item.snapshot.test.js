import React from 'react';
import renderer from 'react-test-renderer';


import Item from './Item.component';

const item = {
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
	it('should display value with two buttons', () => {
		// given
		const props = {
			id: '0-item',
			item: item,
		};

		// when
		const wrapper = renderer.create(
			<Item {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
