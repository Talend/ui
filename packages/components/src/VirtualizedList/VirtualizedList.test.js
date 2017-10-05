import React from 'react';
import { shallow } from 'enzyme';

import VirtualizedList from './VirtualizedList.component';
import { listTypes } from './utils/constants';
import collection from './collection';

const { TABLE } = listTypes;

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
				t={jest.fn()}
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
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy={'name'}
				sortDirection={'DESC'}
				type={TABLE}
				t={jest.fn()}
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
	it('should render Status', () => {
		// given
		const wrapper = shallow(
			<VirtualizedList
				collection={collection}
				height={600}
				id={'my-list-id'}
				isActive={jest.fn()}
				isSelected={jest.fn()}
				inProgress
				onRowClick={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy={'name'}
				sortDirection={'DESC'}
				type={TABLE}
				t={jest.fn()}
			>
				{contentFields}
			</VirtualizedList>
		);
		// then
		expect(wrapper.node).toMatchSnapshot();
	});
});
