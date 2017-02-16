import React from 'react';
import renderer from 'react-test-renderer';

import ItemEdit from './ItemEdit.component';

const item = {
	values: ['toto'],
	itemProps: {
		key: 'values',
		onSubmitItem: jest.fn(), // provided click callback
		onItemChange: jest.fn(),
		onAbortItem: jest.fn(), // provided click callback
		actions: [{
			label: 'Validate',
			id: 'validate',
			onClick: jest.fn(), // provided click callback
		}, {
			label: 'Cancel',
			id: 'cancel',
			onClick: jest.fn(), // provided click callback
		}],
	},
};

describe('Item', () => {
	it('should display input value with two buttons', () => {
		// given
		const props = {
			id: '0-item',
			item,
		};

		function createNodeMock(element) {
			if (element.type === 'input') {
				return {};
			}
			return null;
		}
		const rendererOptions = { createNodeMock };

		// when
		const wrapper = renderer.create(
			<ItemEdit {...props} />,
			rendererOptions
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
