import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import VirtualizedList from '..';
import ListTable from './ListTable.component';
import collection from '../collection';

describe('ListGrid', () => {
	it('should render react-virtualized table', () => {
		// when
		const wrapper = shallow(
			<ListTable collection={collection} height={600} id="my-list" width={1024}>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} />
				<VirtualizedList.Content label="" dataKey="description" width={0} />
			</ListTable>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.getElement().props.rowRenderer.displayName).not.toBe('RowSelection(undefined)');
	});

	it('should render react-virtualized table without header', () => {
		// when
		const wrapper = shallow(
			<ListTable collection={collection} height={600} id="my-list" width={1024} disableHeader>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} />
				<VirtualizedList.Content label="" dataKey="description" width={0} />
			</ListTable>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render table with sort props', () => {
		// when
		const wrapper = shallow(
			<ListTable
				collection={collection}
				height={600}
				id="my-list"
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				width={1024}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} />
				<VirtualizedList.Content label="" dataKey="description" width={0} />
			</ListTable>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should enhance the default rowRenderer with selection Higher Order renderer', () => {
		// when
		const wrapper = shallow(
			<ListTable
				collection={collection}
				height={600}
				id="my-list"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				width={1024}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} />
			</ListTable>,
		);

		// then
		expect(wrapper.getElement().props.rowRenderer.displayName).toBe('RowSelection(undefined)');
	});

	it('should render noRows', () => {
		// when
		const wrapper = mount(
			<ListTable
				collection={[]}
				height={600}
				id="my-list"
				isSelected={jest.fn()}
				width={1024}
				noRowsRenderer={() => <div>No rows</div>}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} />
			</ListTable>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
