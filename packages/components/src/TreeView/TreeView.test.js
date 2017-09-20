import React from 'react';
import renderer from 'react-test-renderer';

import TreeView from './TreeView.component';

const defaultProps = {
	id: 'id',
	structure: [{
		name: 'grandpa',
		actions: [{
			action: () => ('itemRemoveCallback'),
			icon: 'talend-trash',
			label: 'remove element',
		}],
		children: [
			{
				name: 'mami',
				toggled: true,
				children: [
					{ name: 'me', selected: true },
					{ name: 'bro' },
				],
			},
			{ name: 'aunt', toggled: false, children: [{ name: 'cousin' }] },
		],
		toggled: true,
		counter: 101,
		showCounter: true,
	}],
	headerText: 'some elements',
	addAction: () => null,
	addActionLabel: 'add element',
	itemSelectCallback: () => null,
	itemToggleCallback: () => null,
};

describe('TreeView', () => {
	it('should render normally with all buttons and custom labels', () => {
		const wrapper = renderer.create(<TreeView {...defaultProps} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
