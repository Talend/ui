import React from 'react';
import renderer from 'react-test-renderer';

import ItemEdit from './ItemEdit.component';

const item = {
	values: ['toto'],
	itemProps: {
		key: 'values',
		onSubmitItem: jest.fn(), // provided click callback
		onChangeItem: jest.fn(),
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
			currentEdit: {
				validate: {
					disabled: false,
				},
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

	it('should display input value with two buttons. The validate button is disabled', () => {
		// given
		const props = {
			id: '0-item',
			item,
			currentEdit: {
				validate: {
					disabled: true,
				},
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

	it('should display input value with error', () => {
		// given
		const errorItem = { ...item };
		errorItem.error = 'an error occured';
		const props = {
			id: '0-item',
			item: errorItem,
			currentEdit: {
				validate: {
					disabled: false,
				},
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
