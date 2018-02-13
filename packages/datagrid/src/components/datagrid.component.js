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

import theme from './datagrid.scss';

const AG_GRID_CUSTOM_HEADER_KEY = 'headerComponent';
const AG_GRID_CUSTOM_CELL_KEY = 'cellRenderer';
const AG_GRID_DEFAULT_ROW_SELECTION = 'single';
const HEADER_HEIGHT = 69;
const ROW_HEIGHT = 39;

function enchancedHeaderRenderer(getComponent, headerRenderer, onFocusedColumn) {
	const Component = Inject.get(getComponent, headerRenderer);

	return props => <Component {...props} onFocusedColumn={onFocusedColumn} />;
}

function enchancedCellRenderer(getComponent, cellRenderer, avroRenderer) {
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
		columnDefs: [],
		headerHeight: HEADER_HEIGHT,
		headerRenderer: 'DefaultHeaderRenderer',
		pinHeaderRenderer: 'DefaultPinHeaderRenderer',
		pinnedColumnDefs: [],
		rowHeight: ROW_HEIGHT,
		rowData: [],
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
		columnDefs: PropTypes.arrayOf(
			PropTypes.shape({
				field: PropTypes.string.isRequired,
			}),
		),
		getComponent: PropTypes.func,
		headerHeight: PropTypes.number,
		headerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.Element]),
		onFocusedCell: PropTypes.func,
		onFocusedColumn: PropTypes.func,
		pinnedColumnDefs: PropTypes.arrayOf(
			PropTypes.shape({
				field: PropTypes.string.isRequired,
			}),
		),
		pinHeaderRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.Element]),
		rowSelection: PropTypes.string,
		rowHeight: PropTypes.number,
		rowData: PropTypes.arrayOf(PropTypes.object),
		theme: PropTypes.string,
		valueGetter: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.currentColId = null;
		this.gridAPI = null;
		this.handleKeyboard = this.handleKeyboard.bind(this);
		this.onFocusedColumn = this.onFocusedColumn.bind(this);
		this.onGridReady = this.onGridReady.bind(this);
	}

	onGridReady({ api }) {
		this.gridAPI = api;
	}

	onFocusedColumn(colId) {
		let selectedRowIndex = 0;
		if (this.gridAPI.getFocusedCell()) {
			selectedRowIndex = this.gridAPI.getFocusedCell().rowIndex;
		}
		this.gridAPI.setFocusedCell(selectedRowIndex, colId);
		this.setFocusColumn(colId);
		this.props.onFocusedColumn(colId);
	}

	setFocusColumn(colId) {
		this.removeFocusColumn();

		if (colId === 'index.index') {
			return;
		}

		const columnsCells = ReactDOM.findDOMNode(this.gridElement).querySelectorAll(
			`[col-id="${colId}"]`,
		);
		for (const columnCell of columnsCells) {
			columnCell.classList.add('column-focus');
		}
	}

	removeFocusColumn() {
		const focusedCells = ReactDOM.findDOMNode(this.gridElement).querySelectorAll('.column-focus');
		for (const focusedCell of focusedCells) {
			focusedCell.classList.remove('column-focus');
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
			onViewportChanged: () => this.setFocusColumn(this.currentColId),
			onVirtualColumnsChanged: () => this.setFocusColumn(this.currentColId),
			ref: element => (this.gridElement = element),
			rowData: this.props.rowData,
			rowHeight: this.props.rowHeight,
			rowSelection: this.props.rowSelection,
			suppressDragLeaveHidesColumns: true,
			onCellFocused: ({ column, ...rest }) => {
				if (!column) {
					return;
				}

				this.currentColId = column.colId;
				if (column.pinned) {
					this.removeFocusColumn();
					return;
				}

				this.setFocusColumn(this.currentColId);

				if (this.props.onFocusedCell) {
					this.props.onFocusedCell({
						column,
						...rest,
					});
				}
			},
			onGridReady: this.onGridReady,
		};

		if (this.props.pinnedColumnDefs) {
			agGridOptions.columnDefs = this.props.pinnedColumnDefs.map(pinnedColumnDefinition => ({
				lockPosition: true,
				pinned: 'left',
				valueGetter: this.props.valueGetter,
				...pinnedColumnDefinition,
				[AG_GRID_CUSTOM_HEADER_KEY]: PIN_HEADER_RENDERER_COMPONENT,
			}));
		}

		if (this.props.columnDefs) {
			const columnsDefs = this.props.columnDefs.map(columnDefinition => ({
				lockPinned: true,
				valueGetter: this.props.valueGetter,
				...columnDefinition,
				[AG_GRID_CUSTOM_CELL_KEY]: CELL_RENDERER_COMPONENT,
				[AG_GRID_CUSTOM_HEADER_KEY]: HEADER_RENDERER_COMPONENT,
			}));
			agGridOptions.columnDefs = [...agGridOptions.columnDefs, ...columnsDefs];
		}

		agGridOptions.frameworkComponents = {
			[CELL_RENDERER_COMPONENT]: enchancedCellRenderer(
				this.props.getComponent,
				this.props.cellRenderer,
				getAvroRenderer(this.props.avroRenderer),
			),
			[HEADER_RENDERER_COMPONENT]: enchancedHeaderRenderer(
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
			<div className={classNames(theme.grid, theme[this.props.theme])}>
				<AgGridReact {...agGridOptions} />
			</div>
		);
	}
}
