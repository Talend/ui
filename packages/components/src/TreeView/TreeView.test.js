import React from 'react';
import { shallow } from 'enzyme';

import ExportedTreeView from './index';
import TreeView from './TreeView.component';

const defaultProps = {
	id: 'id',
	structure: [
		{
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
	],
	headerText: 'some elements',
	addAction: () => null,
	addActionLabel: 'add element',
	onSelect: () => null,
	onClick: () => null,
};

describe('TreeView', () => {
	it('should be exported', () => {
		expect(TreeView).toBe(ExportedTreeView);
	});
	it('should render normally with all buttons and custom labels', () => {
		const wrapper = shallow(<TreeView {...defaultProps} />);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('when a user click on the add Action it should call props.addAction', () => {
		const props = {
			...defaultProps,
			addAction: jest.fn(),
		};
		const wrapper = shallow(<TreeView {...props} />);
		wrapper.find('Action').simulate('click');
		expect(props.addAction).toHaveBeenCalled();
	});
	it('when a user click on a TreeViewItem it should call props.onClick', () => {
		const props = {
			...defaultProps,
			onClick: jest.fn(),
		};
		const wrapper = shallow(<TreeView {...props} />);
		wrapper.find('TreeViewItem').simulate('click');
		expect(props.onClick).toHaveBeenCalled();
	});
	it('when a user select a TreeViewItem it should call onSelect', () => {
		const props = {
			...defaultProps,
			onSelect: jest.fn(),
		};
		const wrapper = shallow(<TreeView {...props} />);
		wrapper.find('TreeViewItem').simulate('select');
		expect(props.onSelect).toHaveBeenCalled();
	});
});
