import React from 'react';
import { mount } from 'enzyme';

import DisplayTable from './DisplayTable.component';

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
	it('should trigger sort on new column', () => {
		// given
		const sort = {
			field: 'name',
			isDescending: false,
			onChange: jest.fn(),
		};
		const props = {
			items,
			columns,
			sort,
		};

		// when
		const list = (<DisplayTable {...props} />);
		const wrapper = mount(list);
		wrapper.find('th').at(2).find('button').simulate('click');

		// then
		expect(sort.onChange).toBeCalled();
		expect(sort.onChange.mock.calls[0][1]).toEqual({
			field: 'author',
			isDescending: false,
		});
	});

	it('should trigger sort on current column with reverse direction', () => {
		// given
		const sort = {
			field: 'name',
			isDescending: true,
			onChange: jest.fn(),
		};
		const props = {
			items,
			columns,
			sort,
		};

		// when
		const list = (<DisplayTable {...props} />);
		const wrapper = mount(list);
		wrapper.find('th').at(1).find('button').simulate('click');

		// then
		expect(sort.onChange).toBeCalled();
		expect(sort.onChange.mock.calls[0][1]).toEqual({
			field: 'name',
			isDescending: false,
		});
	});
});
