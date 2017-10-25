import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import RowLarge from './RowLarge.component';
import VirtualizedList from '../VirtualizedList.component';
import CellTitle from '../CellTitle';

faker.seed(42);

const titleProps = {
	actionsKey: 'titleActions',
	displayModeKey: 'display',
	iconKey: 'icon',
};

const titleActions = [
	{
		label: 'edit',
		icon: 'talend-pencil',
		onClick: jest.fn(),
	},
	{
		label: 'delete',
		icon: 'talend-trash',
		onClick: jest.fn(),
	},
];

const collection = [
	{
		id: 0,
		name: faker.random.words(),
		description: faker.lorem.sentence(10),
		titleActions,
	},
	{
		id: 1,
		name: faker.random.words(),
		description: faker.lorem.sentence(10),
		titleActions,
	},
];

const parent = {
	props: {
		id: 'my-list',
		collection,
		rowGetter: index => collection[index],
		children: [
			<VirtualizedList.Content label="Id" dataKey="id" width={50} flexShrink={0} flexGrow={0} />,
			<VirtualizedList.Content
				label="Name"
				dataKey="name"
				width={350}
				flexShrink={0}
				flexGrow={0}
				columnData={titleProps}
				{...CellTitle}
			/>,
			<VirtualizedList.Content
				label="Description"
				dataKey="name"
				width={350}
				flexShrink={0}
				flexGrow={0}
			/>,
		],
	},
};

describe('RowLarge', () => {
	it('should render large row', () => {
		// when
		const wrapper = shallow(
			<RowLarge
				className={'my-class-names'}
				index={1}
				key={18}
				parent={parent}
				style={{ background: 'red' }}
			/>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});
});
