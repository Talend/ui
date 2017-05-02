import React from 'react';
import { shallow } from 'enzyme';

import VirtualizedList from '../VirtualizedList.component';
import RowLarge from '../RowLarge';
import ListGrid from './ListGrid.component';

describe('ListGrid', () => {
	const collection = [
		{
			id: 0,
			name: 'Title with icon and actions',
			description: 'Simple row with icon and actions',
			author: 'Jean-Pierre DUPONT',
		},
		{
			id: 1,
			name: 'Title without actions',
			description: 'Simple row without actions',
			author: 'Jean-Pierre DUPONT',
		},
	];

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
					dataKey="actions"
				/>
			</ListGrid>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
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
				<VirtualizedList.Content
					label=""
					dataKey="actions"
				/>
			</ListGrid>
		);

		// then
		expect(wrapper.node.props.rowRenderer.displayName).toBe('RowSelection(VirtualizedList(RowLarge))');
	});
});
