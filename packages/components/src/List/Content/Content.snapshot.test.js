import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import Items from './Content.component';

jest.mock('react-dom');

faker.seed(42);
const columns = [
	{ key: 'icon', label: '', type: 'icon' },
	{ key: 'name', label: 'Name', type: 'title' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];
const items = [
	{
		id: faker.random.number(),
		name: faker.name.firstName(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
		icon: 'fa fa-file-excel-o',
		className: 'item-0-class',
	},
	{
		id: faker.random.number(),
		name: faker.name.firstName(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
		icon: 'fa fa-file-pdf-o',
		className: 'item-1-class',
	},
	{
		id: faker.random.number(),
		name: faker.name.firstName(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
	},
];

describe('Content', () => {
	it('should render', () => {
		// given
		const props = {
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<Items {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with id if provided', () => {
		// given
		const props = {
			id: 'list-items',
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<Items {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with display mode if provided', () => {
		// given
		const props = {
			displayMode: 'tile',
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<Items {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
