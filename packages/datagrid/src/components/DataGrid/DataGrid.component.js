import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import Inject from '@talend/react-components/lib/Inject';
import Skeleton from '@talend/react-components/lib/Skeleton';

import DefaultHeaderRenderer, { HEADER_RENDERER_COMPONENT } from '../DefaultHeaderRenderer';
import DefaultCellRenderer, { CELL_RENDERER_COMPONENT } from '../DefaultCellRenderer';
import DefaultPinHeaderRenderer, {
	PIN_HEADER_RENDERER_COMPONENT,
} from '../DefaultPinHeaderRenderer';

import DATAGRID_PROPTYPES from './DataGrid.proptypes';
import { AVRO_TYPES, NAMESPACE_INDEX } from '../../constants';
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
const COLUMN_MIN_WIDTH = 30;
const ROW_HEIGHT = 39;
const CELL_WIDTH = 150;

// TODO: sad, try a new way to send to InjectedCellRenderer this data
let datagridAvroRenderer;
let datagridCellRenderer;
let datagridGetComponent;

export function injectedHeaderRenderer(getComponent, headerRenderer, onFocusedColumn, onKeyDown) {
	const Component = Inject.get(getComponent, headerRenderer, DefaultHeaderRenderer);

	return props => <Component {...props} onFocusedColumn={onFocusedColumn} onKeyDown={onKeyDown} />;
}

class InjectedCellRenderer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colDef: props.colDef,
			value: props.value,
			data: props.data,
		};
	}

	// refresh(params) {
	// 	if (!isEqual(params.data[params.colDef.field], this.state.data[params.colDef.field])) {
	// 		this.setState({ ...params });
	// 		return true;
	// 	}
	//
	// 	return false;
	// }

	render() {
		const Component = Inject.get(datagridGetComponent, datagridCellRenderer, datagridAvroRenderer);

		return (
			<Component
				{...this.state}
				avroRenderer={datagridAvroRenderer}
				getComponent={datagridGetComponent}
			/>
		);
	}
}

function injectedCellRenderer() {
	const Component = Inject.get(datagridGetComponent, datagridCellRenderer, datagridAvroRenderer);

	return props => (
		<Component {...props} avroRenderer={datagridAvroRenderer} getComponent={datagridGetComponent} />
	);
}

InjectedCellRenderer.defaultProps = {
	value: {},
	data: {},
};

InjectedCellRenderer.propTypes = {
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.oneOf(AVRO_TYPES),
			}),
		}),
	}),
	value: PropTypes.object,
	data: PropTypes.object,
};

export function getAvroRenderer(avroRenderer) {
	return {
		intCellRenderer: 'DefaultIntCellRenderer',
		stringCellRenderer: 'DefaultStringCellRenderer',
		...avroRenderer,
	};
}

export default class DataGrid extends React.Component {
	static defaultProps = {
		cellRenderer: 'DefaultCellRenderer',
		getRowDataFn: serializer.getRowData,
		getPinnedColumnDefsFn: serializer.getPinnedColumnDefs,
		getColumnDefsFn: serializer.getColumnDefs,
		getCellValueFn: serializer.getCellValue,
		headerHeight: HEADER_HEIGHT,
		columnMinWidth: COLUMN_MIN_WIDTH,
		enableColResize: true,
		startIndex: 0,
		headerRenderer: 'DefaultHeaderRenderer',
		pinHeaderRenderer: 'DefaultPinHeaderRenderer',
		rowHeight: ROW_HEIGHT,
		rowSelection: AG_GRID.DEFAULT_ROW_SELECTION,
		rowNodeIdentifier: 'index.index',
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
		let rowData = this.props.rowData;
		if (typeof this.props.getRowDataFn === 'function') {
			rowData = this.props.getRowDataFn(this.props.data, this.props.startIndex);
		}

		const agGridOptions = {
			headerHeight: this.props.headerHeight,
			tabToNextCell: this.handleKeyboard,
			navigateToNextCell: this.handleKeyboard,
			onViewportChanged: this.updateStyleFocusColumn,
			onVirtualColumnsChanged: this.updateStyleFocusColumn,
			overlayNoRowsTemplate: this.props.overlayNoRowsTemplate,
			ref: this.setGridInstance, // use ref in AgGridReact to get the current instance
			rowData,
			rowBuffer: this.props.rowBuffer,
			getRowNodeId: data => data[this.props.rowNodeIdentifier],
			rowHeight: this.props.rowHeight,
			rowSelection: this.props.rowSelection,
			suppressDragLeaveHidesColumns: true,
			enableColResize: this.props.enableColResize,
			onCellFocused: this.onFocusedCell,
			onGridReady: this.onGridReady,
			suppressPropertyNamesCheck: true,
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
					width: CELL_WIDTH,
					lockPinned: true,
					minWidth: this.props.columnMinWidth,
					valueGetter: this.props.getCellValueFn,
					...columnDef,
					[AG_GRID.CUSTOM_CELL_KEY]: CELL_RENDERER_COMPONENT,
					[AG_GRID.CUSTOM_HEADER_KEY]: HEADER_RENDERER_COMPONENT,
				})),
			);
		}

		datagridAvroRenderer = getAvroRenderer(this.props.avroRenderer);
		datagridCellRenderer = this.props.cellRenderer;
		datagridGetComponent = this.props.getComponent;

		agGridOptions.columnDefs = adaptedColumnDefs;
		agGridOptions.frameworkComponents = {
			[CELL_RENDERER_COMPONENT]: injectedCellRenderer(),
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
