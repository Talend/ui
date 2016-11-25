import React from 'react';
import renderer from 'react-test-renderer';

import DisplayTable from './DisplayTable.component';

jest.mock('react-dom');
jest.mock('uuid');

const items = [
	{
		id: 1,
		name: 'Hello world',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		actions: [{
			label: 'edit',
			icon: 'fa fa-edit',
			onClick: jest.fn(),
		}, {
			label: 'delete',
			icon: 'fa fa-trash-o',
			onClick: jest.fn(),
		}],
		icon: 'fa fa-file-excel-o',
	},
	{
		id: 2,
		name: 'Foo',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
	},
	{
		id: 2,
		name: 'Bar',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
	},
];

const columns = [
	{ key: 'id', label: 'Id' },
	{ key: 'name', label: 'Name' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];

describe('DisplayTable', () => {
	it('should render with default title property (name)', () => {
		// given
		const props = {
			items,
			columns,
			titleProps: undefined, // no title key defined
		};

		// when
		const wrapper = renderer.create(<DisplayTable {...props} />).toJSON();

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
		const wrapper = renderer.create(<DisplayTable {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
