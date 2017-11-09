import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import DisplayLarge from './DisplayLarge.component';

jest.mock('react-dom');

faker.seed(42);
const items = [
	{
		id: faker.random.number(),
		name: faker.random.words(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
		actions: [
			{
				label: 'edit',
				icon: 'fa fa-edit',
				onClick: jest.fn(),
			},
			{
				label: 'delete',
				icon: 'fa fa-trash-o',
				onClick: jest.fn(),
			},
		],
		icon: 'fa fa-file-excel-o',
		className: 'item-0-class',
	},
	{
		id: faker.random.number(),
		name: faker.random.words(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
		icon: 'fa fa-file-pdf-o',
		className: 'item-1-class',
	},
	{
		id: faker.random.number(),
		name: faker.random.words(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
	},
];

const columns = [
	{ key: 'id', label: 'Id' },
	{ key: 'name', label: 'Name' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];

describe('DisplayLarge', () => {
	it('should render with default title property (name)', () => {
		// given
		const props = {
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<DisplayLarge {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with defined title property', () => {
		// given
		const props = {
			items,
			columns,
			titleProps: {
				key: 'id', // title key defined
				iconKey: 'icon',
				onClick: jest.fn(),
			},
		};

		// when
		const wrapper = renderer.create(<DisplayLarge {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with id if provided', () => {
		// given
		const props = {
			id: 'large-list',
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<DisplayLarge {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with item custom className if provided', () => {
		// given
		const props = {
			id: 'large-list',
			items,
			columns,
			itemProps: { classNameKey: 'className' },
		};

		// when
		const wrapper = renderer.create(<DisplayLarge {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it("shouldrender selected list element with defaut 'active' class", () => {
		// given
		const props = {
			id: 'large-list',
			items,
			columns,
			itemProps: { isSelected: () => true },
		};

		// when
		const wrapper = renderer.create(<DisplayLarge {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should ender selected list element with custom selectedClass if set', () => {
		// given
		const props = {
			id: 'large-list',
			items,
			columns,
			itemProps: { isSelected: () => true, selectedClass: 'something' },
		};

		// when
		const wrapper = renderer.create(<DisplayLarge {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
