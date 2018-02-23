import React from 'react';
import classNames from 'classnames';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import { Inject } from '@talend/react-components';

import DefaultHeaderRenderer, { HEADER_RENDERER_COMPONENT } from './DefaultHeaderRenderer';
import DefaultCellRenderer, { CELL_RENDERER_COMPONENT } from './DefaultCellRenderer';
import DefaultPinHeaderRenderer, {
	PIN_HEADER_RENDERER_COMPONENT,
} from './DefaultPinHeaderRenderer';

import DATAGRID_PROPTYPES from './datagrid.proptypes';
import { NAMESPACE_INDEX } from './constants';
import serializer from './DatasetSerializer';
import theme from './datagrid.scss';

const FOCUSED_COLUMN_CLASS_NAME = 'column-focus';
const AG_GRID_CUSTOM_HEADER_KEY = 'headerComponent';
const AG_GRID_CUSTOM_CELL_KEY = 'cellRenderer';
export const AG_GRID_ELEMENT = 'eGridDiv';
const AG_GRID_DEFAULT_ROW_SELECTION = 'single';
const HEADER_HEIGHT = 69;
const ROW_HEIGHT = 39;

export function injectedHeaderRenderer(getComponent, headerRenderer, onFocusedColumn) {
	const Component = Inject.get(getComponent, headerRenderer, DefaultHeaderRenderer);

	return props => <Component {...props} onFocusedColumn={onFocusedColumn} />;
}

export function injectedCellRenderer(getComponent, cellRenderer, avroRenderer) {
	const Component = Inject.get(getComponent, cellRenderer, DefaultCellRenderer);

	return props => <Component {...props} avroRenderer={avroRenderer} getComponent={getComponent} />;
}

function getAvroRenderer(avroRenderer) {
	return {
		booleanCellRenderer: 'DefaultBooleanCellRenderer',
		dateCellRenderer: 'DefaultDateCellRenderer',
		intCellRenderer: 'DefaultIntCellRenderer',
		stringCellRenderer: 'DefaultStringCellRenderer',
		...avroRenderer,
	};
}

export default class DataGrid extends React.Component {
	static defaultProps = {
		cellRenderer: 'DefaultCellRenderer',
		getPinnedColumnDefsFn: serializer.getPinnedColumnDefs,
		getColumnDefsFn: serializer.getColumnDefs,
		getRowDataFn: serializer.getRowData,
		getCellValueFn: serializer.getCellValue,
		headerHeight: HEADER_HEIGHT,
		headerRenderer: 'DefaultHeaderRenderer',
		pinHeaderRenderer: 'DefaultPinHeaderRenderer',
		rowHeight: ROW_HEIGHT,
		rowSelection: AG_GRID_DEFAULT_ROW_SELECTION,
	};

	static propTypes = DATAGRID_PROPTYPES;

	constructor(props) {
		super(props);

		this.handleKeyboard = this.handleKeyboard.bind(this);
		this.onFocusedColumn = this.onFocusedColumn.bind(this);
		this.onFocusedCell = this.onFocusedCell.bind(this);
		this.onGridReady = this.onGridReady.bind(this);
		this.setGridInstance = this.setGridInstance.bind(this);
		this.setCurrentFocusedColumn = this.setCurrentFocusedColumn.bind(this);
		this.updateStyleFocusColumn = this.updateStyleFocusColumn.bind(this);
	}

	onGridReady({ api }) {
		this.gridAPI = api;
	}

	onFocusedCell({ column, ...rest }) {
		if (!column) {
			return;
		}

		if (column.colId !== this.currentColId || column.pinned) {
			this.removeFocusColumn();
		}

		this.setCurrentFocusedColumn(column.colId);

		if (column.pinned) {
			return;
		}

		this.updateStyleFocusColumn();

		if (this.props.onFocusedCell) {
			this.props.onFocusedCell({
				column,
				...rest,
			});
		}
	}

	onFocusedColumn(colId) {
		this.gridAPI.deselectAll();
		this.setCurrentFocusedColumn(colId);
		this.removeFocusColumn();
		this.updateStyleFocusColumn();
		this.props.onFocusedColumn(colId);
	}

	setCurrentFocusedColumn(colId) {
		this.currentColId = colId;
	}

	setGridInstance(gridInstance) {
		this.gridInstance = gridInstance;
	}

	removeFocusColumn() {
		// workaround see README.md#Workaround Active Column
		const focusedCells = this.gridInstance[AG_GRID_ELEMENT].querySelectorAll(
			`.${FOCUSED_COLUMN_CLASS_NAME}`,
		);

		for (const focusedCell of focusedCells) {
			focusedCell.classList.remove(FOCUSED_COLUMN_CLASS_NAME);
		}
	}

	updateStyleFocusColumn() {
		const colId = this.currentColId;

		if (!colId || colId.includes(NAMESPACE_INDEX)) {
			return;
		}

		// workaround see README.md#Workaround Active Column
		const columnsCells = this.gridInstance[AG_GRID_ELEMENT].querySelectorAll(
			`[col-id="${colId}"]:not(.${FOCUSED_COLUMN_CLASS_NAME})`,
		);

		for (const columnCell of columnsCells) {
			columnCell.classList.add(FOCUSED_COLUMN_CLASS_NAME);
		}
	}

	handleKeyboard({ nextCellDef, previousCellDef }) {
		if (!nextCellDef) {
			return null;
		}

		if (this.gridAPI && previousCellDef.rowIndex !== nextCellDef.rowIndex) {
			this.gridAPI.getDisplayedRowAtIndex(nextCellDef.rowIndex).setSelected(true, true);
		}

		return nextCellDef;
	}

	render() {
		const agGridOptions = {
			headerHeight: this.props.headerHeight,
			tabToNextCell: this.handleKeyboard,
			navigateToNextCell: this.handleKeyboard,
			onViewportChanged: this.updateStyleFocusColumn,
			onVirtualColumnsChanged: this.updateStyleFocusColumn,
			ref: this.setGridInstance, // use ref in AgGridReact to get the current instance
			rowData: this.props.getRowDataFn(this.props.data),
			rowHeight: this.props.rowHeight,
			rowSelection: this.props.rowSelection,
			suppressDragLeaveHidesColumns: true,
			onCellFocused: this.onFocusedCell,
			onGridReady: this.onGridReady,
		};

		const adaptedPinnedColumnDefs = this.props.getPinnedColumnDefsFn(this.props.data);
		const adaptedColumnDefs = this.props.getColumnDefsFn(this.props.data);

		if (adaptedPinnedColumnDefs) {
			agGridOptions.columnDefs = adaptedPinnedColumnDefs.map(adaptedPinnedColumnDef => ({
				lockPosition: true,
				pinned: 'left',
				valueGetter: this.props.getCellValueFn,
				...adaptedPinnedColumnDef,
				[AG_GRID_CUSTOM_HEADER_KEY]: PIN_HEADER_RENDERER_COMPONENT,
			}));
		}

		if (adaptedColumnDefs) {
			const columnsDefs = adaptedColumnDefs.map(adaptedColumnDef => ({
				lockPinned: true,
				valueGetter: this.props.getCellValueFn,
				...adaptedColumnDef,
				[AG_GRID_CUSTOM_CELL_KEY]: CELL_RENDERER_COMPONENT,
				[AG_GRID_CUSTOM_HEADER_KEY]: HEADER_RENDERER_COMPONENT,
			}));

			agGridOptions.columnDefs = [...agGridOptions.columnDefs, ...columnsDefs];
		}

		agGridOptions.frameworkComponents = {
			[CELL_RENDERER_COMPONENT]: injectedCellRenderer(
				this.props.getComponent,
				this.props.cellRenderer,
				getAvroRenderer(this.props.avroRenderer),
			),
			[HEADER_RENDERER_COMPONENT]: injectedHeaderRenderer(
				this.props.getComponent,
				this.props.headerRenderer,
				this.onFocusedColumn,
			),
			[PIN_HEADER_RENDERER_COMPONENT]: Inject.get(
				this.props.getComponent,
				this.props.pinHeaderRenderer,
				DefaultPinHeaderRenderer,
			),
		};

		return (
			<div className={classNames(theme['td-grid'], this.props.className, 'td-grid')}>
				<AgGridReact {...agGridOptions} />
			</div>
		);
	}
}
