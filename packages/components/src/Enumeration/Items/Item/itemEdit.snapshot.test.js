import React from 'react';
import renderer from 'react-test-renderer';

import ItemEdit from './ItemEdit.component';

const item = {
	id: 1,
	values: ['toto'],
};

describe('Item', () => {
	it('should display input value with two buttons', () => {
		// given
		const props = {
			item: item,
			itemProps: {
				key: 'values',
				onSubmitItem: jest.fn(), // provided click callback
				onAbortItem: jest.fn(), // provided click callback
				actions: [{
					label: 'Validate',
					id: 'validate',
					onClick: jest.fn(), // provided click callback
				}, {
					label: 'Cancel',
					id: 'cancel',
					onClick: jest.fn(), // provided click callback
				}]
			},
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
