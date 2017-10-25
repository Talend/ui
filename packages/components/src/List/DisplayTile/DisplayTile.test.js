import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import DisplayTile from './DisplayTile.component';

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

describe('DisplayTile', () => {
	it('should render 3 tiles with name as title by default', () => {
		// given
		const props = {
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render 3 tiles with id as title by setting', () => {
		// given
		const props = {
			items,
			columns,
			titleProps: {
				key: 'id', // title key defined
				iconKey: 'icon',
			},
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render 3 tiles which render a title buttons', () => {
		// given
		const props = {
			items,
			columns,
			titleProps: {
				key: 'name',
				iconKey: 'icon',
				onClick: jest.fn(), // title click callback defined
			},
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with id if provided', () => {
		// given
		const props = {
			id: 'tile-list',
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with item custom className if provided', () => {
		// given
		const props = {
			id: 'tile-list',
			items,
			columns,
			itemProps: { classNameKey: 'className' },
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it("shoudl render selected list element with defaut 'active' class", () => {
		// given
		const props = {
			id: 'tile-list',
			items,
			columns,
			itemProps: { isSelected: () => true },
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('shoudl render selected list element with custom selectedClass if set', () => {
		// given
		const props = {
			id: 'tile-list',
			items,
			columns,
			itemProps: { isSelected: () => true, selectedClass: 'something' },
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
