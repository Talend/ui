import React from 'react';
import { mount, shallow } from 'enzyme';

import RendererSelector from './RendererSelector.component';
import VirtualizedList from '.';
import { listTypes } from './utils/constants';
import collection from './collection';
import NoRows from './NoRows';

const { TABLE, LARGE } = listTypes;

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
		key="desc"
		label="Description"
		dataKey="description"
		width={350}
		flexShrink={0}
		flexGrow={0}
	/>,
];

function NoRowsRenderer() {
	return <div>I'm a custom NoRowsRenderer</div>;
}

describe('RendererSelector', () => {
	it('should render table list by default', () => {
		// when
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onScroll={jest.fn()}
				onRowDoubleClick={jest.fn()}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render table list when requested', () => {
		// when
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				onScroll={jest.fn()}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={TABLE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render grid list', () => {
		// when
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				type={LARGE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.prop('rowRenderer').displayName).toBe(
			'ListGesture(withI18nextTranslation(VirtualizedList(RowLarge)))',
		);
	});

	it('should render the table with the default NoRows', () => {
		// when
		const wrapper = mount(
			<RendererSelector
				collection={[]}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				type={TABLE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.contains(<NoRows />)).toBe(true);
	});

	it('should render the grid with the default NoRows', () => {
		// when
		const wrapper = mount(
			<RendererSelector
				collection={[]}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				type={LARGE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.contains(<NoRows />)).toBe(true);
	});

	it('should render the table with the noRowsRenderer', () => {
		// when
		const wrapper = mount(
			<RendererSelector
				collection={[]}
				noRowsRenderer={NoRowsRenderer}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={TABLE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.contains(<NoRowsRenderer />)).toBe(true);
	});

	it('should render the grid with the noRowsRenderer', () => {
		// when
		const wrapper = mount(
			<RendererSelector
				collection={[]}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				noRowsRenderer={NoRowsRenderer}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={LARGE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.contains(<NoRowsRenderer />)).toBe(true);
	});
	it('should render the grid with the rowRenders', () => {
		// when
		function Custom() {
			return <span>Custom</span>;
		}
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				noRowsRenderer={NoRowsRenderer}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type="custom"
				rowRenderers={{ custom: Custom }}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.prop('rowRenderer')).toBe(Custom);
	});
});
