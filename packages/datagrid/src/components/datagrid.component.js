import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import { Inject } from '@talend/react-components';

import { HEADER_RENDERER_COMPONENT } from './default-header-renderer';
import { CELL_RENDERER_COMPONENT } from './default-cell-renderer';
import { PIN_HEADER_RENDERER_COMPONENT } from './default-pin-header-renderer';

import { NAMESPACE_INDEX } from './constants';
import sampleSerializer from './sample-serializer';
import theme from './datagrid.scss';

const AG_GRID_CUSTOM_HEADER_KEY = 'headerComponent';
const AG_GRID_CUSTOM_CELL_KEY = 'cellRenderer';
const AG_GRID_DEFAULT_ROW_SELECTION = 'single';
const HEADER_HEIGHT = 69;
const ROW_HEIGHT = 39;

export function injectedHeaderRenderer(getComponent, headerRenderer, onFocusedColumn) {
	const Component = Inject.get(getComponent, headerRenderer);

	return props => <Component {...props} onFocusedColumn={onFocusedColumn} />;
}

export function injectedCellRenderer(getComponent, cellRenderer, avroRenderer) {
	const Component = Inject.get(getComponent, cellRenderer);

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
		getPinnedColumnDefsFn: sampleSerializer.getPinnedColumnDefsFromSample,
		getColumnDefsFn: sampleSerializer.getColumnDefsFromSample,
		getRowDataFn: sampleSerializer.getRowDataFromSample,
		getValueGetterFn: sampleSerializer.valueGetterFromRowData,
		headerHeight: HEADER_HEIGHT,
		headerRenderer: 'DefaultHeaderRenderer',
		pinHeaderRenderer: 'DefaultPinHeaderRenderer',
		rowHeight: ROW_HEIGHT,
		rowSelection: AG_GRID_DEFAULT_ROW_SELECTION,
	};

	static propTypes = {
		avroRenderer: PropTypes.shape({
			booleanCellRenderer: PropTypes.string,
			dateCellRenderer: PropTypes.string,
			intCellRenderer: PropTypes.string,
			stringCellRenderer: PropTypes.string,
		}),
		cellRenderer: PropTypes.string,
		getComponent: PropTypes.func,
		getPinnedColumnDefsFn: PropTypes.func,
		getColumnDefsFn: PropTypes.func,
		getRowDataFn: PropTypes.func,
		getValueGetterFn: PropTypes.func,
		headerHeight: PropTypes.number,
		headerRenderer: PropTypes.string,
		onFocusedCell: PropTypes.func,
		onFocusedColumn: PropTypes.func,
		pinHeaderRenderer: PropTypes.string,
		data: PropTypes.object,
		rowSelection: PropTypes.string,
		rowHeight: PropTypes.number,
		theme: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.handleKeyboard = this.handleKeyboard.bind(this);
		this.onFocusedColumn = this.onFocusedColumn.bind(this);
		this.onFocusedCell = this.onFocusedCell.bind(this);
		this.onGridReady = this.onGridReady.bind(this);
		this.setGridElement = this.setGridElement.bind(this);
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

		this.setCurrentFocusedColumn(column.colId);

		if (column.pinned) {
			this.removeFocusColumn();
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
		let selectedRowIndex = 0;
		if (this.gridAPI.getFocusedCell()) {
			selectedRowIndex = this.gridAPI.getFocusedCell().rowIndex;
		}
		this.setCurrentFocusedColumn(colId);
		this.gridAPI.setFocusedCell(selectedRowIndex, colId);
		this.updateStyleFocusColumn();
		this.props.onFocusedColumn(colId);
	}

	setCurrentFocusedColumn(colId) {
		this.currentColId = colId;
	}

	setGridElement(element) {
		this.gridElement = element;
	}

	removeFocusColumn() {
		const focusedCells = ReactDOM.findDOMNode(this.gridElement).querySelectorAll('.column-focus');
		for (const focusedCell of focusedCells) {
			focusedCell.classList.remove('column-focus');
		}
	}

	updateStyleFocusColumn() {
		const colId = this.currentColId;
		this.removeFocusColumn();

		if (!colId || colId.includes(NAMESPACE_INDEX)) {
			return;
		}

		const columnsCells = ReactDOM.findDOMNode(this.gridElement).querySelectorAll(
			`[col-id="${colId}"]`,
		);
		for (const columnCell of columnsCells) {
			columnCell.classList.add('column-focus');
		}
	}

	handleKeyboard({ nextCellDef, previousCellDef }) {
		if (!nextCellDef) {
			return null;
		}

		if (previousCellDef.rowIndex !== nextCellDef.rowIndex) {
			if (this.gridAPI) {
				this.gridAPI.getDisplayedRowAtIndex(nextCellDef.rowIndex).setSelected(true, true);
			}
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
			ref: this.setGridElement,
			rowData: this.props.getRowDataFn(this.props.data),
			rowHeight: this.props.rowHeight,
			rowSelection: this.props.rowSelection,
			suppressDragLeaveHidesColumns: true,
			onCellFocused: this.onFocusedCell,
			onGridReady: this.onGridReady,
		};

		const pinnedColumnDefs = this.props.getPinnedColumnDefsFn(this.props.data);
		const columnDefs = this.props.getColumnDefsFn(this.props.data);

		if (pinnedColumnDefs) {
			agGridOptions.columnDefs = pinnedColumnDefs.map(pinnedColumnDefinition => ({
				lockPosition: true,
				pinned: 'left',
				valueGetter: this.props.getValueGetterFn,
				...pinnedColumnDefinition,
				[AG_GRID_CUSTOM_HEADER_KEY]: PIN_HEADER_RENDERER_COMPONENT,
			}));
		}

		if (columnDefs) {
			const columnsDefs = columnDefs.map(columnDefinition => ({
				lockPinned: true,
				valueGetter: this.props.getValueGetterFn,
				...columnDefinition,
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
			),
		};

		return (
			<div className={classNames(theme['td-grid'], theme[this.props.theme], 'td-grid')}>
				<AgGridReact {...agGridOptions} />
			</div>
		);
	}
}
