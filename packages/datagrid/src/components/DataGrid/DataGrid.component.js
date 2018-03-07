import React from 'react';
import classNames from 'classnames';
import { AgGridReact } from 'ag-grid-react';
import keycode from 'keycode';
import 'ag-grid/dist/styles/ag-grid.css';
import { Inject, Skeleton } from '@talend/react-components';

import DefaultHeaderRenderer, { HEADER_RENDERER_COMPONENT } from '../DefaultHeaderRenderer';
import DefaultCellRenderer, { CELL_RENDERER_COMPONENT } from '../DefaultCellRenderer';
import DefaultPinHeaderRenderer, {
	PIN_HEADER_RENDERER_COMPONENT,
} from '../DefaultPinHeaderRenderer';

import DATAGRID_PROPTYPES from './DataGrid.proptypes';
import { NAMESPACE_INDEX } from '../../constants';
import serializer from '../DatasetSerializer';
import theme from './DataGrid.scss';

export const AG_GRID = {
	CUSTOM_HEADER_KEY: 'headerComponent',
	CUSTOM_CELL_KEY: 'cellRenderer',
	DEFAULT_ROW_SELECTION: 'single',
	ELEMENT: 'eGridDiv',
	SCROLL_VERTICAL_DIRECTION: 'vertical',
};

const FOCUSED_COLUMN_CLASS_NAME = 'column-focus';
const HEADER_HEIGHT = 55;
const ROW_HEIGHT = 39;
const CELL_WIDTH = 150;

export function injectedHeaderRenderer(getComponent, headerRenderer, onFocusedColumn, onKeyDown) {
	const Component = Inject.get(getComponent, headerRenderer, DefaultHeaderRenderer);

	return props => <Component {...props} onFocusedColumn={onFocusedColumn} onKeyDown={onKeyDown} />;
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
		rowSelection: AG_GRID.DEFAULT_ROW_SELECTION,
	};

	static propTypes = DATAGRID_PROPTYPES;

	constructor(props) {
		super(props);

		this.handleKeyboard = this.handleKeyboard.bind(this);
		this.onFocusedColumn = this.onFocusedColumn.bind(this);
		this.onFocusedCell = this.onFocusedCell.bind(this);
		this.onGridReady = this.onGridReady.bind(this);
		this.onBodyScroll = this.onBodyScroll.bind(this);
		this.setGridInstance = this.setGridInstance.bind(this);
		this.setCurrentFocusedColumn = this.setCurrentFocusedColumn.bind(this);
		this.updateStyleFocusColumn = this.updateStyleFocusColumn.bind(this);
		this.onKeyDownHeaderColumn = this.onKeyDownHeaderColumn.bind(this);
	}

	onGridReady({ api }) {
		this.gridAPI = api;
	}

	onFocusedCell(props) {
		const column = props.column;
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
			this.props.onFocusedCell(props);
		}
	}

	onFocusedColumn(colId) {
		this.gridAPI.deselectAll();
		this.gridAPI.clearFocusedCell();

		this.removeFocusColumn();
		this.setCurrentFocusedColumn(colId);
		this.updateStyleFocusColumn();

		this.props.onFocusedColumn({ colId });
	}

	onKeyDownHeaderColumn(event, colId) {
		if (event.keyCode === keycode('down')) {
			this.gridAPI.setFocusedCell(0, colId);
			this.gridAPI.ensureIndexVisible(0);

			event.preventDefault();
		}
	}

	onBodyScroll(event) {
		if (event.direction === AG_GRID.SCROLL_VERTICAL_DIRECTION) {
			this.props.onVerticalScroll(event, {
				firstDisplayedRowIndex: this.gridAPI.getFirstDisplayedRow(),
				lastDisplayedRowIndex: this.gridAPI.getLastDisplayedRow(),
			});
		}
	}

	setCurrentFocusedColumn(colId) {
		this.currentColId = colId;
	}

	setGridInstance(gridInstance) {
		this.gridInstance = gridInstance;
	}

	getAgGridConfig() {
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

		if (this.props.onVerticalScroll) {
			agGridOptions.onBodyScroll = this.onBodyScroll;
		}

		const pinnedColumnDefs = this.props.getPinnedColumnDefsFn(this.props.data);
		const columnDefs = this.props.getColumnDefsFn(this.props.data);
		let adaptedColumnDefs = [];

		if (pinnedColumnDefs) {
			adaptedColumnDefs = pinnedColumnDefs.map(pinnedColumnDef => ({
				lockPosition: true,
				pinned: 'left',
				valueGetter: this.props.getCellValueFn,
				width: CELL_WIDTH,
				...pinnedColumnDef,
				[AG_GRID.CUSTOM_HEADER_KEY]: PIN_HEADER_RENDERER_COMPONENT,
			}));
		}

		if (columnDefs) {
			adaptedColumnDefs = adaptedColumnDefs.concat(
				columnDefs.map(columnDef => ({
					width: CELL_WIDTH,
					lockPinned: true,
					valueGetter: this.props.getCellValueFn,
					...columnDef,
					[AG_GRID.CUSTOM_CELL_KEY]: CELL_RENDERER_COMPONENT,
					[AG_GRID.CUSTOM_HEADER_KEY]: HEADER_RENDERER_COMPONENT,
				})),
			);
		}

		agGridOptions.columnDefs = adaptedColumnDefs;
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
				this.onKeyDownHeaderColumn,
			),
			[PIN_HEADER_RENDERER_COMPONENT]: Inject.get(
				this.props.getComponent,
				this.props.pinHeaderRenderer,
				DefaultPinHeaderRenderer,
			),
		};

		return agGridOptions;
	}

	removeFocusColumn() {
		// workaround see README.md#Workaround Active Column
		const focusedCells = this.gridInstance[AG_GRID.ELEMENT].querySelectorAll(
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
		const columnsCells = this.gridInstance[AG_GRID.ELEMENT].querySelectorAll(
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
			// ag-grid workaround: ag-grid set a selected row only by a click by an user
			// This allows, when the user move the cell by the keyboard/tab, to set the selected row
			this.gridAPI.getDisplayedRowAtIndex(nextCellDef.rowIndex).setSelected(true, true);
		}

		return nextCellDef;
	}

	render() {
		let content;
		if (this.props.loading) {
			content = <Skeleton name="talend-table" type={Skeleton.TYPES.icon} />;
		} else {
			content = <AgGridReact {...this.getAgGridConfig()} />;
		}

		return (
			<div
				className={classNames(
					{
						[theme['td-grid-loading']]: this.props.loading,
					},
					theme['td-grid'],
					this.props.className,
					'td-grid',
				)}
			>
				{content}
			</div>
		);
	}
}
