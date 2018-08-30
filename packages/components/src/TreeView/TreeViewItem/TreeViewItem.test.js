import React from 'react';
import { mount, shallow } from 'enzyme';
import keycode from 'keycode';
import cases from 'jest-in-case';

import TreeViewItem, { getItemIcon } from './TreeViewItem.component';
import TreeView from '../TreeView.component';

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
	itemSiblings: items,
	level: 2,
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
};
const propsWithIcons = {
	id: 'my-treeview',
	index: 1,
	item: itemWithIcon,
	itemSiblings: items,
	level: 2,
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
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

describe('TreeView', () => {
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
		const event = { stopPropagation: jest.fn() };

		// when
		wrapper.find(`#${props.id}-toggle`).simulate('click', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(props.onToggle).toBeCalledWith(props.item);
	});

	it('should select item on click', () => {
		// given
		const props = {
			...defaultProps,
			onSelect: jest.fn(),
		};
		const wrapper = shallow(<TreeViewItem {...props} />);
		const event = { stopPropagation: jest.fn() };

		// when
		wrapper.simulate('click', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(props.onSelect).toBeCalledWith(props.item);
	});

	describe('gesture', () => {
		it('should select item on enter keydown', () => {
			// given
			const props = {
				...defaultProps,
				onSelect: jest.fn(),
			};
			const wrapper = shallow(<TreeViewItem {...props} />);
			const event = { keyCode: keycode.codes.enter, stopPropagation: jest.fn() };
			expect(props.onSelect).not.toBeCalled();

			// when
			wrapper.simulate('keydown', event);

			// then
			expect(event.stopPropagation).toBeCalled();
			expect(props.onSelect).toBeCalledWith(props.item);
		});

		it('should select item on space keydown', () => {
			// given
			const props = {
				...defaultProps,
				onSelect: jest.fn(),
			};
			const wrapper = shallow(<TreeViewItem {...props} />);
			const event = { keyCode: keycode.codes.space, stopPropagation: jest.fn() };
			expect(props.onSelect).not.toBeCalled();

			// when
			wrapper.simulate('keydown', event);

			// then
			expect(event.stopPropagation).toBeCalled();
			expect(props.onSelect).toBeCalledWith(props.item);
		});

		it('should toggle opened item on left keydown', () => {
			// given
			const props = {
				...defaultProps,
				onToggle: jest.fn(),
			};
			const wrapper = shallow(<TreeViewItem {...props} />);
			const event = { keyCode: keycode.codes.left, stopPropagation: jest.fn() };
			expect(props.onToggle).not.toBeCalled();

			// when
			wrapper.simulate('keydown', event);

			// then
			expect(event.stopPropagation).toBeCalled();
			expect(props.onToggle).toBeCalledWith(props.item);
		});

		it('should toggle closed item on right keydown', () => {
			// given
			const props = {
				...defaultProps,
				item: { ...defaultProps.item, toggled: false },
				onToggle: jest.fn(),
			};
			const wrapper = shallow(<TreeViewItem {...props} />);
			const event = { keyCode: keycode.codes.right, stopPropagation: jest.fn() };
			expect(props.onToggle).not.toBeCalled();

			// when
			wrapper.simulate('keydown', event);

			// then
			expect(event.stopPropagation).toBeCalled();
			expect(props.onToggle).toBeCalledWith(props.item);
		});

		it('should open all siblings on * keydown', () => {
			// given
			const props = {
				...defaultProps,
				onToggleAllSiblings: jest.fn(),
			};
			const wrapper = shallow(<TreeViewItem {...props} />);
			const event = { keyCode: keycode.codes['numpad *'], stopPropagation: jest.fn() };
			expect(props.onToggleAllSiblings).not.toBeCalled();

			// when
			wrapper.simulate('keydown', event);

			// then
			expect(event.stopPropagation).toBeCalled();
			expect(props.onToggleAllSiblings).toBeCalledWith(items);
		});

		function getSelector({ level, posinset }) {
			return `li[aria-level=${level}][aria-posinset=${posinset}]`;
		}

		function testFocus({ elementPosition, expectedActivePosition, keyCode }) {
			// given
			const wrapper = mount(
				<TreeView
					id="my-treeview"
					onToggle={jest.fn()}
					onToggleAllSiblings={jest.fn()}
					onSelect={jest.fn()}
					structure={items}
				/>,
			);
			const event = { keyCode };
			const element = wrapper.find(getSelector(elementPosition));
			const expectedActiveElementId = wrapper.find(getSelector(expectedActivePosition)).prop('id');

			// when
			element.simulate('keydown', event);

			// then
			expect(document.activeElement.getAttribute('id')).toBe(expectedActiveElementId);
		}

		/**
		 * The current data gives this tree. Legend : (level, poinset)
		 * > grandpa (1, 1)
		 *      > mami (2, 1)
		 *           me (3, 1)
		 *           bro (3, 2)
		 *      > aunt (2, 2)
		 *   grandma (1, 2)
		 *   ganduncle (1, 3)
		 * > withIcon (1, 4)
		 */
		cases('focus', testFocus, [
			{
				name: 'should focus its parent on left keydown',
				elementPosition: { level: 3, posinset: 1 },
				expectedActivePosition: { level: 2, posinset: 1 },
				keyCode: keycode.codes.left,
			},
			{
				name: "should focus opened item's first child on right keydown",
				elementPosition: { level: 1, posinset: 1 },
				expectedActivePosition: { level: 2, posinset: 1 },
				keyCode: keycode.codes.right,
			},
			{
				name: 'should focus next item on down keydown',
				elementPosition: { level: 2, posinset: 2 },
				expectedActivePosition: { level: 1, posinset: 2 },
				keyCode: keycode.codes.down,
			},
			{
				name: 'should focus next item on down keydown',
				elementPosition: { level: 2, posinset: 2 },
				expectedActivePosition: { level: 1, posinset: 2 },
				keyCode: keycode.codes.down,
			},
			{
				name: 'should focus previous item on up keydown',
				elementPosition: { level: 2, posinset: 2 },
				expectedActivePosition: { level: 3, posinset: 2 },
				keyCode: keycode.codes.up,
			},
			{
				name: 'should focus first item on home keydown',
				elementPosition: { level: 2, posinset: 2 },
				expectedActivePosition: { level: 1, posinset: 1 },
				keyCode: keycode.codes.home,
			},
			{
				name: 'should focus last item on end keydown',
				elementPosition: { level: 2, posinset: 2 },
				expectedActivePosition: { level: 1, posinset: 4 },
				keyCode: keycode.codes.end,
			},
		]);
	});
});
