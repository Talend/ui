import React from 'react';
import { shallow } from 'enzyme';

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
	addAction: jest.fn(),
	addActionLabel: 'add element',
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
};

describe('TreeView', () => {
	it('should be wrapped by tree gesture HOC', () => {
		expect(TreeView.displayName).toBe('TreeGesture(TreeView)');
	});

	it('should render', () => {
		// when
		const wrapper = shallow(<TreeView {...defaultProps} />);

		// then
		expect(
			wrapper
				.find('TreeView')
				.shallow()
				.getElement(),
		).toMatchSnapshot();
	});

	it('when a user click on the add Action it should call props.addAction', () => {
		// given
		const props = {
			...defaultProps,
			addAction: jest.fn(),
		};
		const wrapper = shallow(<TreeView {...props} />);
		expect(props.addAction).not.toBeCalled();

		// when
		wrapper
			.dive()
			.find('Action')
			.simulate('click');

		// then
		expect(props.addAction).toBeCalled();
	});
});
