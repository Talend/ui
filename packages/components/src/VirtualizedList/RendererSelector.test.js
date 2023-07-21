import { screen, render } from '@testing-library/react';
import RendererSelector from './RendererSelector.component';
import VirtualizedList from '.';
import { listTypes } from './utils/constants';
import collection from './collection';

const { TABLE, LARGE } = listTypes;

const contentFields = [
	<VirtualizedList.Content
		key="id"
		label="Id"
		dataKey="id"
		width={50}
		flexShrink={0}
		flexGrow={0}
		columnData={{}}
	/>,
	<VirtualizedList.Content
		key="name"
		label="Name"
		dataKey="name"
		width={350}
		flexShrink={0}
		flexGrow={0}
		columnData={{}}
	/>,
	<VirtualizedList.Content
		key="desc"
		label="Description"
		dataKey="description"
		width={350}
		flexShrink={0}
		flexGrow={0}
		columnData={{}}
	/>,
];

function NoRowsRenderer() {
	return <div data-testid="NoRowsRenderer">I'm a custom NoRowsRenderer</div>;
}

describe('RendererSelector', () => {
	it('should render table list by default', () => {
		// when
		const { container } = render(
			<RendererSelector
				id="my-list-id"
				collection={collection}
				rowCount={collection.length}
				height={600}
				width={1024}
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onScroll={jest.fn()}
				onRowDoubleClick={jest.fn()}
				selectionToggle={jest.fn()}
				sort={jest.fn(() => collection)}
				sortBy="name"
				sortDirection="DESC"
			>
				{contentFields}
			</RendererSelector>,
		);

		// then
		expect(screen.getByRole('grid')).toBeVisible();
		expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 rows
		expect(screen.getAllByRole('columnheader')).toHaveLength(3);
		expect(screen.getAllByRole('gridcell')).toHaveLength(6);
		expect(screen.getAllByRole('columnheader')[0]).toHaveTextContent('Id');
		expect(screen.getAllByRole('columnheader')[1]).toHaveTextContent('Name');
		expect(screen.getAllByRole('columnheader')[2]).toHaveTextContent('Description');
		expect(screen.getAllByRole('gridcell')[0]).toHaveTextContent('0');
		expect(screen.getAllByRole('gridcell')[1]).toHaveTextContent('Title with icon and actions');
		expect(screen.getAllByRole('gridcell')[2]).toHaveTextContent(
			'Simple row with icon and actions',
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render table list when requested', () => {
		// when
		render(
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
		expect(screen.getByRole('grid')).toBeVisible();
		expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 rows
		expect(screen.getAllByRole('columnheader')).toHaveLength(3);
		expect(screen.getAllByRole('gridcell')).toHaveLength(6);
	});

	it('should render grid list', () => {
		// when
		const { container } = render(
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
		expect(screen.getByRole('list')).toBeVisible();
		expect(screen.getAllByRole('listitem')).toHaveLength(2);
		expect(screen.getAllByRole('definition')).toHaveLength(6);
		expect(screen.getAllByRole('definition')[0]).toHaveTextContent('0');
		expect(screen.getAllByRole('definition')[1]).toHaveTextContent('Title with icon and actions');
		expect(screen.getAllByRole('definition')[2]).toHaveTextContent(
			'Simple row with icon and actions',
		);
	});

	it('should render the table with the default NoRows', () => {
		// when
		render(
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
		expect(screen.getByRole('status')).toHaveTextContent('No results found');
	});

	it('should render the grid with the default NoRows', () => {
		// when
		render(
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
		expect(screen.getByRole('status')).toHaveTextContent('No results found');
	});

	it('should render the table with the noRowsRenderer', () => {
		// when
		render(
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
		expect(screen.getByTestId('NoRowsRenderer')).toBeVisible();
	});

	it('should render the grid with the noRowsRenderer', () => {
		// when
		render(
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
		expect(screen.getByTestId('NoRowsRenderer')).toBeVisible();
	});
	it('should render the grid with the rowRenders', () => {
		// when
		function Custom() {
			return <span data-testid="Custom">Custom</span>;
		}
		render(
			<RendererSelector
				collection={collection}
				height={600}
				id="my-list-id"
				isActive={jest.fn(() => false)}
				isSelected={jest.fn(() => false)}
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
		expect(screen.getAllByTestId('Custom')).toHaveLength(2);
	});
});
