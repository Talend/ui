import React from 'react';
import { shallow, mount } from 'enzyme';

import VirtualizedList from '.';
import collection from './collection';

const { TABLE } = VirtualizedList.LIST_TYPES;

const contentFields = [
	<VirtualizedList.Content
		key="id"
		label="Id"
		dataKey="id"
		width={50}
		flexShrink={0}
		flexGrow={0}
	/>,
	<VirtualizedList.Content
		key="name"
		label="Name"
		dataKey="name"
		width={350}
		flexShrink={0}
		flexGrow={0}
	/>,
	<VirtualizedList.Content
		key="description"
		label="Description"
		dataKey="description"
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
				id="my-list-id"
				isSelected={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={TABLE}
			>
				{contentFields}
			</VirtualizedList>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should use defaultHeight if AutoSizer can not get parent element height', () => {
		// when
		const wrapper = mount(
			<span>
				<VirtualizedList
					collection={collection}
					id="my-list-id"
					isSelected={jest.fn()}
					rowHeight={50}
					selectionToggle={jest.fn()}
					sort={jest.fn()}
					sortBy="name"
					sortDirection="DESC"
					type={TABLE}
				>
					{contentFields}
				</VirtualizedList>
			</span>,
		);

		// then
		expect(wrapper.find('VirtualizedList(RendererSelector)').props().height).toBe(250);
	});

	it('should render RendererSelector', () => {
		// given
		const wrapper = mount(
			<VirtualizedList
				collection={collection}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				onScroll={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={TABLE}
			>
				{contentFields}
			</VirtualizedList>,
		);
		expect(wrapper.find('VirtualizedList(RendererSelector)')).toHaveLength(1);
	});

	it('should render CircularProgress', () => {
		// given
		const wrapper = shallow(
			<VirtualizedList
				collection={collection}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				inProgress
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={TABLE}
			>
				{contentFields}
			</VirtualizedList>,
		);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
