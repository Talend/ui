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
	it('should return icon', () => {
		expect(getItemIcon('my', true)).toBe('my');
		expect(getItemIcon('my', false)).toBe('my-closed');
		expect(getItemIcon(undefined, true)).toBe('talend-folder');
		expect(getItemIcon(undefined, false)).toBe('talend-folder-closed');
	});
});

describe('TreeView', () => {
	it('should render normally with all buttons and custom labels', () => {
		const wrapper = shallow(<TreeViewItem {...defaultProps} />);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('when the user click the item it should get focus and call props.onClick and props.onSelect', () => {
		const props = {
			...defaultProps,
			onClick: jest.fn(),
			onSelect: jest.fn(),
		};
		const focus = jest.fn();
		const wrapper = shallow(<TreeViewItem {...props} />);
		wrapper.instance().elementRef = { focus };
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
		wrapper.instance().elementRef = { focus };
		wrapper.find('.tc-treeview-item').simulate('keyDown', { keyCode: keycode.codes.enter });
		expect(props.onClick).toHaveBeenCalled();
		expect(props.onSelect).toHaveBeenCalled();
		expect(focus).toHaveBeenCalled();
	});
});
