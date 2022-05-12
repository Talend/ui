/* eslint-disable react/sort-comp */
import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';

import { Icon } from '@talend/design-system';
import DefaultHeaderRenderer, { HEADER_RENDERER_COMPONENT } from '../DefaultHeaderRenderer';
import DefaultCellRenderer, { CELL_RENDERER_COMPONENT } from '../DefaultCellRenderer';
import DefaultPinHeaderRenderer, { PIN_HEADER_RENDERER_COMPONENT } from '../PinHeaderRenderer';
import DefaultIntCellRenderer from '../DefaultIntCellRenderer';
import DefaultRenderer from '../DefaultCellRenderer/DefaultRenderer.component';

import DATAGRID_PROPTYPES from './DataGrid.proptypes';
import { NAMESPACE_INDEX } from '../../constants';
import serializer from '../DatasetSerializer';
import theme from './DataGrid.scss';

export const AG_GRID = {
	CUSTOM_HEADER_KEY: 'headerComponent',
	CUSTOM_CELL_KEY: 'cellRenderer',
	DEFAULT_ROW_SELECTION: 'single',
	SCROLL_VERTICAL_DIRECTION: 'vertical',
};

const FOCUSED_COLUMN_CLASS_NAME = 'column-focus';
const HEADER_HEIGHT = 65;
const COLUMN_MIN_WIDTH = 30;
const ROW_HEIGHT = 39;
const CELL_WIDTH = 150;

export function injectHeaderRenderer(Component, onFocusedColumn, onKeyDown) {
	// eslint-disable-next-line react/display-name
	return props => <Component {...props} onFocusedColumn={onFocusedColumn} onKeyDown={onKeyDown} />;
}

export function injectCellRenderer(Component, avroRenderer) {
	// eslint-disable-next-line react/display-name
	return props => <Component {...props} avroRenderer={avroRenderer} />;
}

export function getAvroRenderer(avroRenderer) {
	return {
		intCellRenderer: DefaultIntCellRenderer,
		stringCellRenderer: DefaultRenderer,
		// Date are formatted on backend side
		// dateCellRenderer: DefaultDateCellRenderer,
		...avroRenderer,
	};
}

export default class DataGrid extends React.Component {
	static defaultProps = {
		cellRenderer: DefaultCellRenderer,
		columnMinWidth: COLUMN_MIN_WIDTH,
		deltaRowDataMode: true,
		enableColResize: true,
		getCellValueFn: serializer.getCellValue,
		getColumnDefsFn: serializer.getColumnDefs,
		getPinnedColumnDefsFn: serializer.getPinnedColumnDefs,
		getRowDataFn: serializer.getRowData,
		headerHeight: HEADER_HEIGHT,
		headerRenderer: DefaultHeaderRenderer,
		pinHeaderRenderer: DefaultPinHeaderRenderer,
		rowHeight: ROW_HEIGHT,
		rowNodeIdentifier: 'index.index',
		rowSelection: AG_GRID.DEFAULT_ROW_SELECTION,
		startIndex: 0,
	};

	static propTypes = DATAGRID_PROPTYPES;

	constructor(props) {
		super(props);

		this.handleKeyboard = this.handleKeyboard.bind(this);
		this.onFocusedColumn = this.onFocusedColumn.bind(this);
		this.shouldUpdateCurrentColumn = this.shouldUpdateCurrentColumn.bind(this);
		this.onFocusedCell = this.onFocusedCell.bind(this);
		this.onGridReady = this.onGridReady.bind(this);
		this.onBodyScroll = this.onBodyScroll.bind(this);
		this.setCurrentFocusedColumn = this.setCurrentFocusedColumn.bind(this);
		this.updateStyleFocusColumn = this.updateStyleFocusColumn.bind(this);
		this.onKeyDownHeaderColumn = this.onKeyDownHeaderColumn.bind(this);
		this.currentColId = null;
		this.containerRef = React.createRef();
	}

	/**
	 * not the grid
	 * @deprecated
	 * @param  {object} prevProps previous props
	 */
	componentDidUpdate(prevProps) {
		if (this.props.loading || !this.gridAPI) {
			return;
		}

		if (
			this.props.focusedColumnId !== prevProps.focusedColumnId &&
			this.props.focusedColumnId !== this.currentColId
		) {
			this.onFocusedColumn(this.props.focusedColumnId);
		}
	}

	handleKeyboard({ nextCellPosition, previousCellPosition }) {
		if (!nextCellPosition || nextCellPosition.rowIndex < 0) {
			return null;
		}

		if (this.gridAPI && previousCellPosition.rowIndex !== nextCellPosition.rowIndex) {
			// ag-grid workaround: ag-grid set a selected row only by a click by an user
			// This allows, when the user move the cell by the keyboard/tab, to set the selected row
			this.gridAPI.getDisplayedRowAtIndex(nextCellPosition.rowIndex).setSelected(true, true);
		}

		return nextCellPosition;
	}

	onGridReady({ api }) {
		this.gridAPI = api;
		if (this.props.focusedColumnId && this.props.focusedColumnId !== this.currentColId) {
			this.onFocusedColumn(this.props.focusedColumnId);
		}
	}

	onFocusedCell(props) {
		const column = props.column;
		if (!column) {
			return;
		}

		if (this.shouldUpdateCurrentColumn()) {
			if (column.colId !== this.currentColId || column.pinned) {
				this.removeFocusColumn();
			}

			this.setCurrentFocusedColumn(column.colId);

			if (column.pinned) {
				return;
			}

			this.updateStyleFocusColumn();
		}

		if (this.props.onFocusedCell) {
			this.props.onFocusedCell(props);
		}
	}

	onFocusedColumn(colId) {
		if (this.shouldUpdateCurrentColumn()) {
			// Scroll to focused column in controlled mode
			if (this.props.focusedColumnId != null) {
				this.gridAPI.ensureColumnVisible(colId);
			}

			this.gridAPI.deselectAll();
			this.gridAPI.clearFocusedCell();

			this.removeFocusColumn();
			this.setCurrentFocusedColumn(colId);
			this.updateStyleFocusColumn();
		}

		if (this.props.onFocusedColumn && this.props.focusedColumnId !== colId) {
			this.props.onFocusedColumn({ colId });
		}
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

	getAgGridConfig() {
		let rowData = this.props.rowData;
		if (typeof this.props.getRowDataFn === 'function') {
			rowData = this.props.getRowDataFn(this.props.data, this.props.startIndex);
		}

		const agGridOptions = {
			deltaRowDataMode: this.props.deltaRowDataMode,
			getRowNodeId: data => data[this.props.rowNodeIdentifier],
			headerHeight: this.props.headerHeight,
			navigateToNextCell: this.handleKeyboard,
			onCellFocused: this.onFocusedCell,
			onGridReady: this.onGridReady,
			onViewportChanged: this.updateStyleFocusColumn,
			onVirtualColumnsChanged: this.updateStyleFocusColumn,
			overlayNoRowsTemplate: this.props.overlayNoRowsTemplate,
			rowBuffer: this.props.rowBuffer,
			rowData,
			rowHeight: this.props.rowHeight,
			rowSelection: this.props.rowSelection,
			suppressDragLeaveHidesColumns: true,
			suppressPropertyNamesCheck: true,
			tabToNextCell: this.handleKeyboard,
		};

		if (this.props.onVerticalScroll) {
			agGridOptions.onBodyScroll = this.onBodyScroll;
		}

		const pinnedColumnDefs = this.props.getPinnedColumnDefsFn(this.props.data);
		const columnDefs = this.props.getColumnDefsFn(this.props.data, this.props.columnsConf);

		let adaptedColumnDefs = [];

		if (pinnedColumnDefs) {
			adaptedColumnDefs = pinnedColumnDefs.map(pinnedColumnDef => ({
				lockPosition: true,
				pinned: 'left',
				minWidth: this.props.columnMinWidth,
				valueGetter: this.props.getCellValueFn,
				width: CELL_WIDTH,
				...pinnedColumnDef,
				[AG_GRID.CUSTOM_HEADER_KEY]: PIN_HEADER_RENDERER_COMPONENT,
			}));
		}

		if (columnDefs) {
			adaptedColumnDefs = adaptedColumnDefs.concat(
				columnDefs.map(columnDef => ({
					lockPinned: true,
					minWidth: this.props.columnMinWidth,
					valueGetter: this.props.getCellValueFn,
					width: CELL_WIDTH,
					resizable: this.props.enableColResize,
					...columnDef,
					[AG_GRID.CUSTOM_CELL_KEY]: CELL_RENDERER_COMPONENT,
					[AG_GRID.CUSTOM_HEADER_KEY]: HEADER_RENDERER_COMPONENT,
				})),
			);
		}

		agGridOptions.columnDefs = adaptedColumnDefs;
		agGridOptions.frameworkComponents = {
			[CELL_RENDERER_COMPONENT]: injectCellRenderer(
				this.props.cellRenderer,
				getAvroRenderer(this.props.avroRenderer),
			),
			[HEADER_RENDERER_COMPONENT]: injectHeaderRenderer(
				this.props.headerRenderer,
				this.onFocusedColumn,
				this.onKeyDownHeaderColumn,
			),
			[PIN_HEADER_RENDERER_COMPONENT]: this.props.pinHeaderRenderer,
		};
		return agGridOptions;
	}

	shouldUpdateCurrentColumn() {
		// Update local state if component is not controlled or if props changed
		return (
			this.props.focusedColumnId === undefined || this.props.focusedColumnId !== this.currentColId
		);
	}

	removeFocusColumn() {
		// workaround see README.md#Workaround Active Column
		const focusedCells = this.containerRef.current.querySelectorAll(
			`.${FOCUSED_COLUMN_CLASS_NAME}`,
		);

		focusedCells.forEach(({ classList }) => classList.remove(FOCUSED_COLUMN_CLASS_NAME));
	}

	updateStyleFocusColumn() {
		const colId = this.currentColId;

		if (!colId || colId.includes(NAMESPACE_INDEX)) {
			return;
		}

		// workaround see README.md#Workaround Active Column
		const columnsCells = this.containerRef.current.querySelectorAll(
			`[col-id="${colId}"]:not(.${FOCUSED_COLUMN_CLASS_NAME})`,
		);

		columnsCells.forEach(({ classList }) => classList.add(FOCUSED_COLUMN_CLASS_NAME));
	}

	render() {
		let content;
		if (this.props.loading) {
			content = (
				<div className={theme['td-grid-loader']}>
					<Icon name="talend-table" />
				</div>
			);
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
				ref={this.containerRef}
			>
				{content}
			</div>
		);
	}
}
