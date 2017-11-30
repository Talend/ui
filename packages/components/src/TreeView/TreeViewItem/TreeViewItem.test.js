import React from 'react';
import { shallow } from 'enzyme';
import keycode from 'keycode';

import TreeViewItem, { getItemIcon } from './TreeViewItem.component';

const defaultProps = {
	item: {
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
				name: 'mami',
				toggled: true,
				children: [{ name: 'me', selected: true }, { name: 'bro' }],
			},
			{ name: 'aunt', toggled: false, children: [{ name: 'cousin' }] },
		],
		toggled: true,
		counter: 101,
		showCounter: true,
	},
	onSelect: () => null,
	onClick: () => null,
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
	it('should render normally with all buttons and custom labels', () => {
		const wrapper = shallow(<TreeViewItem {...defaultProps} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('when the user click the item it should get focus and call props.onClick and props.onSelect', () => {
		const props = {
			...defaultProps,
			onClick: jest.fn(),
			onSelect: jest.fn(),
		};
		const focus = jest.fn();
		const wrapper = shallow(<TreeViewItem {...props} />);
		wrapper.instance().containerRef = { focus };
		wrapper.find('.tc-treeview-item').simulate('click');
		expect(props.onClick).toHaveBeenCalled();
		expect(props.onSelect).toHaveBeenCalled();
		expect(focus).toHaveBeenCalled();
	});
	it('when item has focus and the user type enter it should call props.onClick and props.onSelect', () => {
		const props = {
			...defaultProps,
			onClick: jest.fn(),
			onSelect: jest.fn(),
		};
		const focus = jest.fn();
		const wrapper = shallow(<TreeViewItem {...props} />);
		wrapper.instance().containerRef = { focus };
		wrapper.find('.tc-treeview-item').simulate('keyDown', { keyCode: keycode.codes.enter });
		expect(props.onClick).toHaveBeenCalled();
		expect(props.onSelect).toHaveBeenCalled();
		expect(focus).toHaveBeenCalled();
	});
});
