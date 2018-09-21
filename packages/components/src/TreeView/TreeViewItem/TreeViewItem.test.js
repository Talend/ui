import React from 'react';
import { shallow } from 'enzyme';

import TreeViewItem, { getItemIcon } from './TreeViewItem.component';

const item = {
	id: 1,
	name: 'grandpa',
	actions: [
		{
			action: () => 'itemRemoveCallback',
			icon: 'talend-trash',
			label: 'remove element',
		},
	],
	children: [
		{
			id: 11,
			name: 'mami',
			toggled: true,
			children: [{ id: 111, name: 'me' }, { id: 112, name: 'bro' }],
		},
		{
			id: 12,
			name: 'aunt',
			toggled: false,
			children: [{ id: 121, name: 'cousin' }],
		},
	],
	toggled: true,
	counter: 101,
	showCounter: true,
};
const itemWithIcon = {
	name: 'grandpa',
	icon: {
		name: 'src-http://static.pokemonpets.com/images/monsters-images-300-300/106-Hitmonlee.png',
		title: 'A pokemon',
	},
	actions: [
		{
			action: () => 'itemRemoveCallback',
			icon: 'talend-trash',
			label: 'remove element',
		},
	],
	toggled: true,
	counter: 101,
	showCounter: true,
};
const items = [item, { id: 2, name: 'grandma' }, { id: 3, name: 'granduncle' }, itemWithIcon];

const defaultProps = {
	id: 'my-treeview',
	index: 1,
	item,
	level: 2,
	onKeyDown: jest.fn(),
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
	siblings: items,
};
const propsWithIcons = {
	id: 'my-treeview',
	index: 1,
	item: itemWithIcon,
	level: 2,
	onKeyDown: jest.fn(),
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
	siblings: items,
};

describe('getItemIcon', () => {
	it('should return given icon when toggled', () => {
		expect(getItemIcon('my', true)).toBe('my');
	});

	it('should return closed version of the given icon when not toggled', () => {
		expect(getItemIcon('my', false)).toBe('my-closed');
	});

	it('should return talend-folder icon when toggled without icon name', () => {
		expect(getItemIcon(undefined, true)).toBe('talend-folder');
	});

	it('should return talend-folder-closed icon when not toggled and without icon name', () => {
		expect(getItemIcon(undefined, false)).toBe('talend-folder-closed');
	});
});

describe('TreeView item', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(<TreeViewItem {...defaultProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render items with icon', () => {
		// when
		const wrapper = shallow(<TreeViewItem {...propsWithIcons} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should toggle item on toggle button click', () => {
		// given
		const props = {
			...defaultProps,
			onToggle: jest.fn(),
		};
		const wrapper = shallow(<TreeViewItem {...props} />);
		const event = { target: {} };

		// when
		wrapper.find(`#${props.id}-toggle`).simulate('click', event);

		// then
		expect(props.onToggle).toBeCalledWith(event, props.item);
	});

	it('should select item on click', () => {
		// given
		const props = {
			...defaultProps,
			onSelect: jest.fn(),
		};
		const wrapper = shallow(<TreeViewItem {...props} />);
		const event = { target: {} };

		// when
		wrapper.simulate('click', event);

		// then
		expect(props.onSelect).toBeCalledWith(event, props.item);
	});
});
