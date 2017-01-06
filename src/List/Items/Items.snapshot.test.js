import React from 'react';
import renderer from 'react-test-renderer';

import Items from './Items.component';

jest.mock('react-dom');

const columns = [
	{ key: 'name', label: 'Name', type: 'title' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];
const items = [
	{
		id: 1,
		name: 'Hello world',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
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
		id: 2,
		name: 'Foo',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
		className: 'item-1-class',
	},
	{
		id: 2,
		name: 'Bar',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
	},
];

describe('Items', () => {
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
