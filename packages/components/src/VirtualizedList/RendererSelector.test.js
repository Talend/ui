import React from 'react';
import { shallow } from 'enzyme';

import RendererSelector from './RendererSelector.component';
import VirtualizedList from './VirtualizedList.component';
import { listTypes } from './utils/constants';
import collection from './collection';

const { TABLE, LARGE } = listTypes;

const contentFields = [
	<VirtualizedList.Content label="Id" dataKey="id" width={50} flexShrink={0} flexGrow={0} />,
	<VirtualizedList.Content label="Name" dataKey="name" width={350} flexShrink={0} flexGrow={0} />,
	<VirtualizedList.Content
		label="Description"
		dataKey="name"
		width={350}
		flexShrink={0}
		flexGrow={0}
	/>,
];

describe('RendererSelector', () => {
	it('should render table list by default', () => {
		// when
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				height={600}
				id={'my-list-id'}
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy={'name'}
				sortDirection={'DESC'}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render table list when requested', () => {
		// when
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				height={600}
				id={'my-list-id'}
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy={'name'}
				sortDirection={'DESC'}
				type={TABLE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render grid list', () => {
		// when
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				height={600}
				id={'my-list-id'}
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				type={LARGE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
		expect(wrapper.node.props.rowRenderer.displayName).toBe('VirtualizedList(RowLarge)');
	});
});
