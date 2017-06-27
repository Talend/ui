import React from 'react';
import { shallow } from 'enzyme';

import ListGrid from './ListGrid.component';
import VirtualizedList from '../VirtualizedList.component';
import RowLarge from '../RowLarge';
import collection from '../collection';

describe('ListGrid', () => {
	it('should render react-virtualized list', () => {
		// when
		const wrapper = shallow(
			<ListGrid
				collection={collection}
				height={600}
				id={'my-list'}
				rowHeight={130}
				rowRenderer={RowLarge}
				width={1024}
			>
				<VirtualizedList.Content
					label="Id"
					dataKey="id"
				/>
				<VirtualizedList.Content
					label="Name"
					dataKey="name"
				/>
				<VirtualizedList.Content
					label=""
					dataKey="description"
				/>
			</ListGrid>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
		expect(wrapper.node.props.rowRenderer.displayName).toBe('VirtualizedList(RowLarge)');
	});

	it('should enhance the rowRenderer with selection Higher Order renderer', () => {
		// when
		const wrapper = shallow(
			<ListGrid
				collection={collection}
				height={600}
				id={'my-list'}
				isSelected={jest.fn()}
				rowHeight={130}
				rowRenderer={RowLarge}
				selectionToggle={jest.fn()}
				width={1024}
			>
				<VirtualizedList.Content
					label="Id"
					dataKey="id"
				/>
				<VirtualizedList.Content
					label="Name"
					dataKey="name"
				/>
			</ListGrid>
		);

		// then
		expect(wrapper.node.props.rowRenderer.displayName).toBe('RowSelection(VirtualizedList(RowLarge))');
	});

	it('should render no-rows component', () => {
		// when
		const wrapper = shallow(
			<ListGrid
				collection={[]}
				height={600}
				id={'my-list'}
				isSelected={jest.fn()}
				rowHeight={130}
				rowRenderer={RowLarge}
				selectionToggle={jest.fn()}
				width={1024}
			>
				<VirtualizedList.Content
					label="Id"
					dataKey="id"
				/>
				<VirtualizedList.Content
					label="Name"
					dataKey="name"
				/>
			</ListGrid>
		);
		const NoRows = wrapper.prop('noRowsRenderer');
		const noRowsWrapper = shallow(<NoRows />);

		// then
		expect(noRowsWrapper.node).toMatchSnapshot();
	});
});
