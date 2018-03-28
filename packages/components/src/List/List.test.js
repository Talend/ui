import React from 'react';
import { mount } from 'enzyme';
import List from './List.component';
import toJsonWithoutI18n from '../../test/props-without-i18n';

const listProps = {
	columns: [{ key: 'id', label: 'Id' }, { key: 'name', label: 'Name' }],
	items: [{ id: 1, name: 'Hello world' }, { id: 2, name: 'Foo' }, { id: 3, name: 'Bar' }],
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
		options: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
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
		const wrapper = mount(<List {...props} />);
		expect(toJsonWithoutI18n(wrapper.find('.tc-list'))).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		const tProps = {
			id: 'context',
			...props,
		};
		const wrapper = mount(<List {...tProps} />);
		expect(toJsonWithoutI18n(wrapper.find('.tc-list'))).toMatchSnapshot();
	});

	it('should not render the toolbar without toolbar props', () => {
		const wrapper = mount(<List displayMode="table" list={listProps} />);
		expect(toJsonWithoutI18n(wrapper.find('.tc-list'))).toMatchSnapshot();
	});
});
