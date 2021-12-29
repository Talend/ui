import PropTypes from 'prop-types';

const DATAGRID_PROPTYPES = {
	avroRenderer: PropTypes.shape({
		intCellRenderer: PropTypes.string,
		stringCellRenderer: PropTypes.string,
	}),
	cellRenderer: PropTypes.string,
	className: PropTypes.string,
	loading: PropTypes.bool,
	enableColResize: PropTypes.bool,
	columnMinWidth: PropTypes.number,
	focusedColumnId: PropTypes.string,
	forceRedrawRows: PropTypes.func, // deprecated
	getComponent: PropTypes.func,
	getPinnedColumnDefsFn: PropTypes.func,
	getColumnDefsFn: PropTypes.func,
	getRowDataFn: PropTypes.func,
	startIndex: PropTypes.number,
	getCellValueFn: PropTypes.func,
	headerHeight: PropTypes.number,
	headerRenderer: PropTypes.string,
	onFocusedCell: PropTypes.func,
	onFocusedColumn: PropTypes.func,
	onVerticalScroll: PropTypes.func,
	pinHeaderRenderer: PropTypes.string,
	data: PropTypes.object,
	rowData: PropTypes.array,
	rowSelection: PropTypes.string,
	rowHeight: PropTypes.number,
	deltaRowDataMode: PropTypes.bool,
	rowBuffer: PropTypes.number,
	rowNodeIdentifier: PropTypes.string,
};

export default DATAGRID_PROPTYPES;
