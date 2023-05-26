import { screen, render } from '@testing-library/react';

import VirtualizedList from '..';
import ListTable from './ListTable.component';
import collection from '../collection';

describe('ListGrid', () => {
	it('should render react-virtualized table', () => {
		// when
		const { container } = render(
			<ListTable collection={collection} height={600} id="my-list" width={1024}>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} columnData={{}} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} columnData={{}} />
				<VirtualizedList.Content label="" dataKey="description" width={0} columnData={{}} />
			</ListTable>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getAllByRole('row')).toHaveLength(3);

		expect(screen.getAllByRole('row')[0]).toHaveClass('tc-list-headerRow');
	});

	it('should render react-virtualized table without header', () => {
		// when
		render(
			<ListTable collection={collection} height={600} id="my-list" width={1024} disableHeader>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} columnData={{}} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} columnData={{}} />
				<VirtualizedList.Content label="" dataKey="description" width={0} columnData={{}} />
			</ListTable>,
		);

		// then
		expect(screen.getAllByRole('row')[0]).not.toHaveClass('tc-list-headerRow');
		expect(screen.getAllByRole('row')[0]).toHaveClass('tc-list-item');
	});

	it('should render table with sort props', () => {
		// when
		render(
			<ListTable
				collection={collection}
				height={600}
				id="my-list"
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				width={1024}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} columnData={{}} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} columnData={{}} />
				<VirtualizedList.Content label="" dataKey="description" width={0} columnData={{}} />
			</ListTable>,
		);

		// then
		const headers = screen.getAllByRole('columnheader');
		expect(headers[0]).toHaveAttribute('aria-sort', 'none');
		expect(headers[1]).toHaveAttribute('aria-sort', 'descending');
		expect(headers[2]).toHaveAttribute('aria-sort', 'none');
	});

	it('should render noRows', () => {
		// when
		render(
			<ListTable
				collection={[]}
				height={600}
				id="my-list"
				isSelected={jest.fn()}
				width={1024}
				noRowsRenderer={() => <div data-testid="noRowsRenderer">No rows</div>}
			>
				<VirtualizedList.Content label="Id" dataKey="id" width={0} columnData={{}} />
				<VirtualizedList.Content label="Name" dataKey="name" width={0} columnData={{}} />
			</ListTable>,
		);

		// then
		expect(screen.getByTestId('noRowsRenderer')).toBeVisible();
	});
});
