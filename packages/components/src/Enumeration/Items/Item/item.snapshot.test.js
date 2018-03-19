import React from 'react';
import renderer from 'react-test-renderer';

import Item from './Item.component';

const item = {
	values: ['toto'],
	itemProps: {
		key: 'values',
		onSubmitItem: jest.fn(), // provided click callback
		onAbortItem: jest.fn(), // provided click callback
		onSelectItem: jest.fn(), // provided click callback
		isSelected: false,
		actions: [
			{
				label: 'Edit',
				id: 'edit',
				onClick: jest.fn(), // provided click callback
			},
			{
				label: 'Delete',
				id: 'delete',
				onClick: jest.fn(), // provided click callback
			},
		],
	},
};

const selectedItem = {
	values: ['toto'],
	isSelected: true,
	itemProps: {
		key: 'values',
		onSubmitItem: jest.fn(), // provided click callback
		onAbortItem: jest.fn(), // provided click callback
		onSelectItem: jest.fn(), // provided click callback
		isSelected: true,
		actions: [],
	},
};

describe('Item', () => {
	it('should display value with three buttons', () => {
		// given
		const props = {
			id: '0-item',
			item,
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should display a selected item', () => {
		// given
		const props = {
			id: '0-item',
			item: selectedItem,
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should display value if it is a string', () => {
		const props = {
			item: {
				...item,
				values: 'toto',
			},
		};

		const wrapper = renderer.create(<Item {...props} />).toJSON();

		expect(wrapper).toMatchSnapshot();
	});
});
