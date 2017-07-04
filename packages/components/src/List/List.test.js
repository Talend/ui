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
	itemProps: {
		isSelected: () => false,
		onToggleAll: jest.fn(),
		onToggle: jest.fn(),
	},
	titleProps: {
		onClick: jest.fn(),
	},
};

const toolbarProps = {
	display: {
		onChange: jest.fn(),
	},
	sort: {
		field: 'name',
		onChange: jest.fn(),
		options: [
			{ id: 'id', name: 'Id' },
			{ id: 'name', name: 'Name' },
		],
	},
	pagination: {
		startIndex: 6,
		totalResults: 13,
		onChange: jest.fn(),
		itemsPerPage: 5,
	},
	filter: {
		onFilter: jest.fn(),
		onToggle: jest.fn(),
	},
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

	it('should render empty list in table', () => {
		const tProps = {
			...listProps,
			items: [],
		};

		const wrapper = renderer.create(<List list={tProps} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render empty list in large', () => {
		const tProps = {
			...listProps,
			items: [],
		};

		const wrapper = renderer.create(<List list={tProps} displayMode="large" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render empty list in tile', () => {
		const tProps = {
			...listProps,
			items: [],
		};

		const wrapper = renderer.create(<List list={tProps} displayMode="tile" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
