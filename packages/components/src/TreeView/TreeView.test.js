import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import TreeView from './TreeView.component';

faker.seed(42);
const defaultProps = {
	id: faker.random.word(),
	structure: [
		{
			name: faker.name.firstName(),
			actions: [
				{
					action: () => 'itemRemoveCallback',
					icon: 'talend-trash',
					label: 'remove element',
				},
			],
			children: [
				{
					name: faker.name.firstName(),
					toggled: true,
					children: [
						{ name: faker.name.firstName(), selected: true },
						{ name: faker.name.firstName() },
					],
				},
				{
					name: faker.name.firstName(),
					toggled: false,
					children: [{ name: faker.name.firstName() }],
				},
			],
			toggled: true,
			counter: 101,
			showCounter: true,
		},
	],
	headerText: faker.random.words(),
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
