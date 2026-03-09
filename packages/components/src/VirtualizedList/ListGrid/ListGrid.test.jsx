import { screen, render } from '@testing-library/react';

import ListGrid from './ListGrid.component';
import VirtualizedList from '..';
import RowLarge from '../RowLarge';
import collection from '../collection';

describe('ListGrid', () => {
	it('should render react-virtualized list', () => {
		// when
		const { container } = render(
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
				<VirtualizedList.Content label="Id" dataKey="id" width={0} columnData={{}} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} columnData={{}} />
				<VirtualizedList.Content label="" dataKey="description" width={0} columnData={{}} />
			</ListGrid>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render noRows', () => {
		// when
		render(
			<ListGrid
				collection={[]}
				height={600}
				id="my-list"
				isSelected={jest.fn()}
				rowHeight={130}
				rowRenderer={RowLarge}
				width={1024}
				noRowsRenderer={() => <div data-testid="noRowsRenderer">No rows</div>}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} columnData={{}} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} columnData={{}} />
			</ListGrid>,
		);

		// then
		expect(screen.getByTestId('noRowsRenderer')).toBeVisible();
	});
});
