import React from 'react';
import renderer from 'react-test-renderer';

import DisplayTable from './DisplayTable.component';

jest.mock('react-dom');

const columnActions = [
	{
		label: 'favorite',
		icon: 'talend-star',
		className: 'favorite',
		onClick: jest.fn(),
	}, {
		label: 'certify',
		icon: 'talend-badge',
		className: 'certify',
		onClick: jest.fn(),
	},
];

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

	it('should render with id if provided', () => {
		// given
		const props = {
			id: 'table-list',
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<DisplayTable {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with item custom className if provided', () => {
		// given
		const props = {
			id: 'table-list',
			items,
			columns,
			itemProps: { classNameKey: 'className' },
		};

		// when
		const wrapper = renderer.create(<DisplayTable {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render selected list element with defaut \'active\' class', () => {
		// given
		const props = {
			id: 'table-list',
			items,
			columns,
			itemProps: { isSelected: () => true },
		};

		// when
		const wrapper = renderer.create(<DisplayTable {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render selected list element with custom selectedClass if set', () => {
		// given
		const props = {
			id: 'table-list',
			items,
			columns,
			itemProps: { isSelected: () => true, selectedClass: 'something' },
		};

		// when
		const wrapper = renderer.create(<DisplayTable {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render column actions', () => {
		// given
		columns.splice(2, 0, { key: 'columnActions', label: '' });
		items[0].columnActions = columnActions;
		const props = {
			items,
			columns,
		};

		// when
		const wrapper = renderer.create(<DisplayTable {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
