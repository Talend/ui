import React from 'react';
import renderer from 'react-test-renderer';

import List from './List.component';

jest.mock('react-dom');

const listProps = {
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'name', label: 'Name' },
	],
	items: [
		{ id: 1, name: 'Hello world' },
		{ id: 2, name: 'Foo' },
		{ id: 3, name: 'Bar' },
	],
	titleProps: {
		onClick: jest.fn(),
	},
};

const toolbarProps = {
	onClickAdd: jest.fn(),
	onFilter: jest.fn(),
	onSelectSortBy: jest.fn(),
	onSelectDisplayMode: jest.fn(),
	sortOptions: [
		{ id: 'id', name: 'Id' },
		{ id: 'name', name: 'Name' },
	],
	sortBy: 'name',
};

const props = {
	displayMode: 'table',
	list: listProps,
	toolbar: toolbarProps,
};

describe('List', () => {
	it('should render', () => {
		const wrapper = renderer.create(<List {...props} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		const tProps = {
			id: 'context',
			...props,
		};
		const wrapper = renderer.create(<List {...tProps} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should not render the toolbar without toolbar props', () => {
		const wrapper = renderer.create(<List displayMode="table" list={listProps} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
