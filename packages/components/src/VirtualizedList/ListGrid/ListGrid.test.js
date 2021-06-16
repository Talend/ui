import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ListGrid from './ListGrid.component';
import VirtualizedList from '..';
import RowLarge from '../RowLarge';
import collection from '../collection';

describe('ListGrid', () => {
	it('should render react-virtualized list', () => {
		// when
		const wrapper = shallow(
			<ListGrid
				collection={collection}
				height={600}
				id="my-list"
				rowHeight={130}
				rowRenderer={RowLarge}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				width={1024}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} />
				<VirtualizedList.Content label="" dataKey="description" width={0} />
			</ListGrid>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.getElement().props.rowRenderer.displayName).toBe(
			'ListGesture(withI18nextTranslation(VirtualizedList(RowLarge)))',
		);
	});

	it('should enhance the rowRenderer with selection Higher Order renderer', () => {
		// when
		const wrapper = shallow(
			<ListGrid
				collection={collection}
				height={600}
				id="my-list"
				isSelected={jest.fn()}
				rowHeight={130}
				rowRenderer={RowLarge}
				width={1024}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} />
			</ListGrid>,
		);

		// then
		expect(wrapper.getElement().props.rowRenderer.displayName).toBe(
			'RowSelection(ListGesture(withI18nextTranslation(VirtualizedList(RowLarge))))',
		);
	});

	it('should render noRows', () => {
		// when
		const wrapper = mount(
			<ListGrid
				collection={[]}
				height={600}
				id="my-list"
				isSelected={jest.fn()}
				rowHeight={130}
				rowRenderer={RowLarge}
				width={1024}
				noRowsRenderer={() => <div>No rows</div>}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} />
			</ListGrid>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
