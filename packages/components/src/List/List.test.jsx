import { screen, render } from '@testing-library/react';
import List from './List.component';

const listProps = {
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'name', label: 'Name' },
	],
	items: [
		{ id: 1, name: 'Hello world' },
		{ id: 2, name: 'Foo' },
		{ id: 3, name: 'Bar' },
	],
	itemProps: {
		isSelected: () => false,
		onToggleAll: jest.fn(),
		onToggle: jest.fn(),
	},
	titleProps: {
		onClick: jest.fn(),
	},
};

const toolbarProps = {
	display: {
		onChange: jest.fn(),
	},
	sort: {
		field: 'name',
		onChange: jest.fn(),
		options: [
			{ id: 'id', name: 'Id' },
			{ id: 'name', name: 'Name' },
		],
	},
	pagination: {
		startIndex: 6,
		totalResults: 13,
		onChange: jest.fn(),
		itemsPerPage: 5,
	},
	filter: {
		onFilter: jest.fn(),
		onToggle: jest.fn(),
	},
};

const props = {
	displayMode: 'table',
	list: listProps,
	toolbar: toolbarProps,
};

describe('List', () => {
	it('should render', () => {
		const { container } = render(<List {...props} />);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('toolbar')).toBeInTheDocument();
		expect(screen.getByRole('grid')).toBeInTheDocument();
	});

	it('should render with computed id if provided', () => {
		const tProps = {
			id: 'context',
			...props,
		};
		render(<List {...tProps} />);
		expect(screen.getByRole('grid')).toHaveAttribute('id', 'context');
		expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'context-header-check');
	});

	it('should not render the toolbar without toolbar props', () => {
		render(<List displayMode="table" list={listProps} />);
		expect(screen.queryByRole('toolbar')).not.toBeInTheDocument();
	});
});
