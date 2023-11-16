/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cloneDeep from 'lodash/cloneDeep';

import VirtualizedList from '../../VirtualizedList';
import { ListToVirtualizedList, compareOrder } from './ListToVirtualizedList.component';

jest.unmock('@talend/design-system');
jest.mock('../../VirtualizedList', () => {
	const getProps = jest.fn();
	const Original = jest.requireActual('../../VirtualizedList').default;
	const TestVList = ({
		sortBy,
		sortDirection,
		rowHeight,
		type,
		collection,
		defaultHeight,
		...props
	}) => (
		<div
			data-testid="VirtualizedList"
			data-props={JSON.stringify({
				sortBy,
				sortDirection,
				rowHeight,
				type,
				collection,
				defaultHeight,
			})}
		>
			{props.headerAction}
			{props.children}
			<button type="button" onClick={() => getProps(props)}>
				getProps
			</button>
		</div>
	);
	Object.entries(Original).forEach(([key, value]) => {
		TestVList[key] = value;
	});
	TestVList.getProps = getProps;
	TestVList.Content = props => <div data-testid="Content" data-props={JSON.stringify(props)}></div>;
	return TestVList;
});

const props = {
	id: 'mylistid',
	items: [{ id: 3, label: 'my item', myactions: [{ foo: 'bar' }] }],
	columns: [
		{ key: 'id', label: 'Id', type: 'customType', header: 'customType' },
		{ key: 'label', label: 'Label', disableSort: true },
		{ key: 'tag', label: 'Tag', type: 'badge' },
		{ key: 'myactions', label: 'Actions', hideHeader: true },
	],
	titleProps: {
		key: 'label',
		extra: 'Extra',
	},
};

describe('ListToVirtualizedList', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should map props', () => {
		render(<ListToVirtualizedList {...props} />);
		const testProps = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(testProps.collection).toMatchObject(props.items);
		expect(testProps.type).toBe('TABLE');

		const columns = screen.getAllByTestId('Content');
		expect(columns.length).toBe(4);
		columns.forEach(element => {
			const eProps = JSON.parse(element.dataset.props);
			if (eProps.label === 'Id') {
				expect(eProps.dataKey).toBe('id');
			} else if (eProps.label === 'Label') {
				expect(eProps.dataKey).toBe('label');
				expect(eProps.columnData.extra).toBe('Extra');
			} else if (eProps.label === 'Actions') {
				expect(eProps.dataKey).toBe('myactions');
				expect(eProps.disableSort).toBe(true);
			} else if (eProps.label === 'Tag') {
				expect(eProps.dataKey).toBe('tag');
			} else {
				expect(false).toBe(true);
			}
		});
	});

	it('should support defaultHeight', () => {
		const rProps = { ...props, defaultHeight: 300 };
		render(<ListToVirtualizedList {...rProps} displayMode="table" />);
		const passedProps = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(passedProps.defaultHeight).toBe(300);
	});

	it('should support displayMode', () => {
		const { rerender } = render(<ListToVirtualizedList {...props} displayMode="table" />);
		const table = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(table.type).toBe('TABLE');

		rerender(<ListToVirtualizedList {...props} displayMode="large" />);
		const large = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(large.type).toBe('LARGE');
	});

	it('should support rowHeight', () => {
		const rProps = { ...props, rowHeight: 200 };
		render(<ListToVirtualizedList {...rProps} displayMode="table" />);
		const table = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(table.rowHeight).toBe(200);
	});

	it('columns should have disableSort prop to true if hideHeader or disableSort is true', () => {
		render(<ListToVirtualizedList {...props} />);
		const columns = screen.getAllByTestId('Content');
		columns.forEach(element => {
			const eProps = JSON.parse(element.dataset.props);
			if (eProps.label === 'Label' || eProps.label === 'Actions') {
				expect(eProps.disableSort).toBeTruthy();
			} else {
				expect(eProps.disableSort).toBeFalsy();
			}
		});
	});

	it('should add actionsKey to titleProps', () => {
		// when
		render(<ListToVirtualizedList {...props} />);

		// then
		const columns = screen.getAllByTestId('Content');
		columns.forEach(element => {
			const eProps = JSON.parse(element.dataset.props);
			if (eProps.columnData) {
				expect(eProps.columnData.actionsKey).toBe('actions');
			}
		});
	});

	it('should NOT add actionsKey without titleProps', () => {
		// when
		render(<ListToVirtualizedList {...props} titleProps={undefined} />);

		// then
		const columns = screen.getAllByTestId('Content');
		columns.forEach(element => {
			const eProps = JSON.parse(element.dataset.props);
			if (eProps.columnData) {
				expect(eProps.columnData.actionsKey).toBe('actions');
			}
		});
	});

	it('should find renderer based on column type', async () => {
		const user = userEvent.setup();

		// given
		const renderer = function test() {
			return 'ok';
		};
		const customDictionary = { customType: { cellRenderer: renderer } };
		render(<ListToVirtualizedList {...props} cellDictionary={customDictionary} />);

		// when
		await user.click(screen.getByText('getProps'));
		const renderProps = VirtualizedList.getProps.mock.calls[0][0];
		const CellActions = VirtualizedList.cellDictionary.actions;
		const CellBadge = VirtualizedList.cellDictionary.badge;

		// then
		expect(renderProps.children[0].props.label).toBe('Id');
		expect(renderProps.children[0].props.cellRenderer).toBe(renderer);
		expect(renderProps.children[2].props.label).toBe('Tag');
		expect(renderProps.children[2].props.cellRenderer).toBe(CellBadge.cellRenderer);
		expect(renderProps.children[3].props.label).toBe('Actions');
		expect(renderProps.children[3].props.cellRenderer).toBe(CellActions.cellRenderer);
	});

	it('should support custom header renderer', async () => {
		const user = userEvent.setup();

		// given
		const renderer = function test() {
			return 'ok';
		};
		const customHeaderDictionary = { customType: { headerRenderer: renderer } };
		render(<ListToVirtualizedList {...props} headerDictionary={customHeaderDictionary} />);

		// when
		await user.click(screen.getByText('getProps'));
		const renderProps = VirtualizedList.getProps.mock.calls[0][0];

		// then
		const column = renderProps.children[0].props;
		expect(column.label).toBe('Id');
		expect(column.headerRenderer).toBe(renderer);
	});

	it('should support column hide feature', async () => {
		const user = userEvent.setup();

		// given
		const hideProps = cloneDeep(props);
		hideProps.columns.find(column => column.label === 'Tag').hidden = true;
		render(<ListToVirtualizedList {...hideProps} />);

		// when
		await user.click(screen.getByText('getProps'));
		const renderProps = VirtualizedList.getProps.mock.calls[0][0];

		// then
		const columnId = renderProps.children.filter(column => column.props.label === 'Id');
		const columnTag = renderProps.children.filter(column => column.props.label === 'Tag');
		expect(columnId.length).toBe(1);
		expect(columnTag.length).toBe(0);
	});

	it('should adapt sort info', async () => {
		// given
		const { rerender } = render(
			<ListToVirtualizedList {...props} sort={{ field: 'name', isDescending: false }} />,
		);

		// when
		const ascVirtualizedProps = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		rerender(<ListToVirtualizedList {...props} sort={{ field: 'name', isDescending: true }} />);
		const descVirtualizedProps = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);

		// then
		expect(ascVirtualizedProps.sortBy).toBe('name');
		expect(ascVirtualizedProps.sortDirection).toBe(VirtualizedList.SORT_BY.ASC);
		expect(descVirtualizedProps.sortDirection).toBe(VirtualizedList.SORT_BY.DESC);
	});

	it('should adapt sort onChange', async () => {
		const user = userEvent.setup();

		// given
		const onChange = jest.fn();
		render(
			<ListToVirtualizedList {...props} sort={{ field: 'name', isDescending: false, onChange }} />,
		);

		// when
		await user.click(screen.getByText('getProps'));
		const virtualizedProps = VirtualizedList.getProps.mock.calls[0][0];
		virtualizedProps.sort({ sortBy: 'name', sortDirection: VirtualizedList.SORT_BY.DESC });

		// then
		expect(onChange).toHaveBeenCalledWith(null, { field: 'name', isDescending: true });
	});

	it('should adapt selection isSelected', async () => {
		const user = userEvent.setup();

		// given
		const isSelected = jest.fn();
		render(<ListToVirtualizedList {...props} itemProps={{ isSelected }} />);

		// when
		await user.click(screen.getByText('getProps'));
		const virtualizedProps = VirtualizedList.getProps.mock.calls[0][0];
		virtualizedProps.isSelected(props.items[0]);

		// then
		expect(isSelected).toHaveBeenCalledWith(props.items[0]);
	});

	it('should adapt selection onToggle', async () => {
		const user = userEvent.setup();

		// given
		const onToggle = jest.fn();
		const event = { target: {} };
		render(<ListToVirtualizedList {...props} itemProps={{ onToggle }} />);

		// when
		await user.click(screen.getByText('getProps'));
		const virtualizedProps = VirtualizedList.getProps.mock.calls[0][0];
		virtualizedProps.selectionToggle(event, props.items[0]);

		// then
		expect(onToggle).toHaveBeenCalledWith(event, props.items[0]);
	});

	it('should adapt click onRowClick', async () => {
		const user = userEvent.setup();

		// given
		const onRowClick = jest.fn();
		const event = { target: {} };
		render(<ListToVirtualizedList {...props} itemProps={{ onRowClick }} />);

		// when
		await user.click(screen.getByText('getProps'));
		const virtualizedProps = VirtualizedList.getProps.mock.calls[0][0];
		virtualizedProps.onRowClick(event, props.items[0]);

		// then
		expect(onRowClick).toHaveBeenCalledWith(event, props.items[0]);
	});

	it('should adapt click onRowDoubleClick', async () => {
		const user = userEvent.setup();

		// given
		props.titleProps.onClick = jest.fn();
		const event = { target: {} };
		render(<ListToVirtualizedList {...props} />);

		// when
		await user.click(screen.getByText('getProps'));
		const virtualizedProps = VirtualizedList.getProps.mock.calls[0][0];
		virtualizedProps.onRowDoubleClick(event, props.items[0]);

		// then
		expect(props.titleProps.onClick).toHaveBeenCalledWith(event, props.items[0]);
	});

	it('should adapt selection isActive', async () => {
		const user = userEvent.setup();

		// given
		const isActive = jest.fn();
		render(<ListToVirtualizedList {...props} itemProps={{ isActive }} />);

		// when
		await user.click(screen.getByText('getProps'));
		const virtualizedProps = VirtualizedList.getProps.mock.calls[0][0];
		virtualizedProps.isActive(props.items[0]);

		// then
		expect(isActive).toHaveBeenCalledWith(props.items[0]);
	});

	describe('compareOrder function', () => {
		it('should return -1 to keep the lower order first', () => {
			// given
			const a = { order: 0 };
			const b = { order: 1 };
			// when
			const result = compareOrder(a, b);
			// then
			expect(result).toBe(-1);
		});

		it('should return 0 if there is no order set between 2 items', () => {
			// given
			const a = {};
			const b = {};
			// when
			const result = compareOrder(a, b);
			// then
			expect(result).toBe(0);
		});

		it('should return -1 if there is only a to pass an order to push b to the end', () => {
			// given
			const a = { order: 1 };
			const b = {};
			// when
			const result = compareOrder(a, b);
			// then
			expect(result).toBe(-1);
		});
		it('should return 1 if there is only b to pass an order to push a to the end', () => {
			// given
			const a = {};
			const b = { order: 1 };
			// when
			const result = compareOrder(a, b);
			// then
			expect(result).toBe(1);
		});
	});
});
