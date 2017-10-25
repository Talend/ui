import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import Item from './Item.component';

jest.mock('react-dom');

faker.seed(42);
const columns = [
	{ key: 'name', label: 'Name', type: 'title' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];
const item = {
	id: faker.random.number(),
	name: faker.random.words(),
	created: '2016-09-22',
	modified: '2016-09-22',
	author: faker.fake('{name.firstName} {name.lastName}'),
	icon: 'fa fa-file-excel-o',
};
const actions = [
	{
		key: 'edit',
		label: 'Edit',
		icon: 'fa fa-edit',
		onClick: jest.fn(),
	},
	{
		key: 'delete',
		label: 'Delete',
		icon: 'fa fa-trash-o',
		onClick: jest.fn(),
	},
];

describe('Item', () => {
	it('should render', () => {
		// given
		const props = {
			item,
			columns,
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with id if provided', () => {
		// given
		const props = {
			id: 'list-item',
			item,
			columns,
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with item custom className', () => {
		// given
		const props = {
			item: Object.assign({}, item, { className: 'item-1-class' }),
			columns,
			itemProps: { classNameKey: 'className' },
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with selected item', () => {
		// given
		const props = {
			item,
			columns,
			itemProps: { isSelected: () => true },
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with custom selected class', () => {
		// given
		const props = {
			item,
			columns,
			itemProps: {
				isSelected: () => () => true,
				selectedClass: 'selectedClass',
			},
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with actions', () => {
		// given
		const props = {
			item,
			actions,
			columns,
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with icon', () => {
		// given
		const props = {
			item,
			columns: [{ key: 'icon', label: '', type: 'icon' }, ...columns],
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
