import React from 'react';
import { shallow, mount } from 'enzyme';

import RowLarge from './RowLarge.component';
import VirtualizedList from '..';
import CellTitle from '../CellTitle';

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
		name: 'Title from first item',
		description: 'This comes from first element in collection',
		titleActions,
	},
	{
		id: 1,
		name: 'Title from second item',
		description: 'This comes from second element in collection',
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
	const random = Math.random();

	beforeAll(() => {
		Math.random = () => 0.5;
	});

	afterAll(() => {
		Math.random = random;
	});

	it('should render large row', () => {
		// when
		const wrapper = shallow(
			<RowLarge
				className="my-class-names"
				index={1}
				parent={parent}
				style={{ background: 'red' }}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render RandomSizeSkeleton with empty data', () => {
		// given
		const noDataParent = {
			...parent,
			props: {
				...parent.props,
				rowGetter: () => ({}),
			},
		};

		// when
		const wrapper = mount(<RowLarge className="my-class-names" index={1} parent={noDataParent} />);

		// then 3 columns on one line
		expect(wrapper.find('RandomSizeSkeleton').length).toBe(3);
	});
});
