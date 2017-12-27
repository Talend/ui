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
		expect(wrapper.getElement()).toMatchSnapshot();
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
		expect(wrapper.getElement()).toMatchSnapshot();
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
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.getElement().props.rowRenderer.displayName).toBe('VirtualizedList(RowLarge)');
	});

	it('should render the table with the default NoRows', () => {
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
				type={TABLE}
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.props().noRowsRenderer()).toMatchSnapshot();
	});

	it('should render the grid with the default NoRows', () => {
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
				width={1024}
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(wrapper.props().noRowsRenderer()).toMatchSnapshot();
	});

	it('should render the table with the noRowsRenderer', () => {
		// when
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				noRowsRenderer={NoRowsRenderer}
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
		expect(wrapper.props().noRowsRenderer()).toMatchSnapshot();
	});

	it('should render the grid with the noRowsRenderer', () => {
		// when
		const wrapper = shallow(
			<RendererSelector
				collection={collection}
				height={600}
				id={'my-list-id'}
				isActive={jest.fn()}
				isSelected={jest.fn()}
				noRowsRenderer={NoRowsRenderer}
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
		expect(wrapper.props().noRowsRenderer()).toMatchSnapshot();
	});
});
