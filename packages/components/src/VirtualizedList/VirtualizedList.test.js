import { screen, render } from '@testing-library/react';
import VirtualizedList from '.';
import collection from './collection';

const { TABLE } = VirtualizedList.LIST_TYPES;

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
		key="description"
		label="Description"
		dataKey="description"
		width={350}
		flexShrink={0}
		flexGrow={0}
	/>,
];

jest.mock('react-virtualized', () => {
	const mod = jest.requireActual('react-virtualized');
	// eslint-disable-next-line @typescript-eslint/no-shadow
	return {
		...mod,
		AutoSizer: ({ disableHeight, children }) => (
			<div data-testid="AutoSizer" data-disableheight={disableHeight}>
				{children({ height: 100, width: 100 })}
			</div>
		),
	};
});

describe('VirtualizedList', () => {
	it('should render', () => {
		// when
		const { container } = render(
			<VirtualizedList
				collection={collection}
				height={600}
				width={1024}
				id="my-list-id"
				isSelected={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={TABLE}
			>
				{contentFields}
			</VirtualizedList>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should use AutoSizer', () => {
		// when
		render(
			<VirtualizedList
				collection={collection}
				height={600}
				width={1024}
				id="my-list-id"
				isSelected={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={TABLE}
			>
				{contentFields}
			</VirtualizedList>,
		);

		// then
		expect(screen.getByTestId('AutoSizer')).toBeInTheDocument();
	});

	it('should render CircularProgress', () => {
		// given
		render(
			<VirtualizedList
				inProgress
				collection={collection}
				height={600}
				id="my-list-id"
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				rowHeight={50}
				selectionToggle={jest.fn()}
				sort={jest.fn()}
				sortBy="name"
				sortDirection="DESC"
				type={TABLE}
			>
				{contentFields}
			</VirtualizedList>,
		);
		// then
		expect(screen.getByTestId('circular-progress')).toBeVisible();
	});
});
