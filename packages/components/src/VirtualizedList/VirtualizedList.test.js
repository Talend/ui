import React from 'react';
import { shallow } from 'enzyme';

import RendererSelector from './RendererSelector.component';
import VirtualizedList from './VirtualizedList.component';
import { listTypes } from './utils/constants';

const { TABLE, LARGE } = listTypes;

const collection = [
	{
		id: 0,
		name: 'Title from first item',
		description: 'This comes from first element in collection',
	},
	{
		id: 1,
		name: 'Title from second item',
		description: 'This comes from second element in collection',
	},
];

const contentFields = [
	<VirtualizedList.Content
		label="Id"
		dataKey="id"
		width={50}
		flexShrink={0}
		flexGrow={0}
	/>,
	<VirtualizedList.Content
		label="Name"
		dataKey="name"
		width={350}
		flexShrink={0}
		flexGrow={0}
	/>,
	<VirtualizedList.Content
		label="Description"
		dataKey="name"
		width={350}
		flexShrink={0}
		flexGrow={0}
	/>,
];

describe('VirtualizedList', () => {
	it('should use AutoSizer', () => {
		// when
		const wrapper = shallow(
			<VirtualizedList
				collection={collection}
				height={600}
				id={'my-list-id'}
				isSelected={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy={'name'}
				sortDirection={'DESC'}
				type={TABLE}
			>
				{contentFields}
			</VirtualizedList>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render RendererSelector', () => {
		// given
		const wrapper = shallow(
			<VirtualizedList
				collection={collection}
				height={600}
				id={'my-list-id'}
				isSelected={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy={'name'}
				sortDirection={'DESC'}
				type={TABLE}
			>
				{contentFields}
			</VirtualizedList>
		);
		const renderer = wrapper.node.props.children;

		// when
		const rendererInstance = renderer({ height: 600, width: 300 });

		// then
		expect(rendererInstance).toMatchSnapshot();
	});
});
