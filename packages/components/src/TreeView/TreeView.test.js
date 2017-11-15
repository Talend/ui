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
	addAction: () => null,
	addActionLabel: 'add element',
	onSelect: () => null,
	onClick: () => null,
};

describe('TreeView', () => {
	it('should render normally with all buttons and custom labels', () => {
		const wrapper = shallow(<TreeView {...defaultProps} />);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});
