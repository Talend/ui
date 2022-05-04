import PropTypes from 'prop-types';

const DATAGRID_PROPTYPES = {
	avroRenderer: PropTypes.shape({
		intCellRenderer: PropTypes.element,
		stringCellRenderer: PropTypes.element,
	}),
	cellRenderer: PropTypes.element,
	className: PropTypes.string,
	loading: PropTypes.bool,
	enableColResize: PropTypes.bool,
	columnMinWidth: PropTypes.number,
	focusedColumnId: PropTypes.string,
	forceRedrawRows: PropTypes.func, // deprecated
	getPinnedColumnDefsFn: PropTypes.func,
	getColumnDefsFn: PropTypes.func,
	getRowDataFn: PropTypes.func,
	startIndex: PropTypes.number,
	getCellValueFn: PropTypes.func,
	headerHeight: PropTypes.number,
	headerRenderer: PropTypes.element,
	onFocusedCell: PropTypes.func,
	onFocusedColumn: PropTypes.func,
	onVerticalScroll: PropTypes.func,
	pinHeaderRenderer: PropTypes.element,
	data: PropTypes.object,
	rowData: PropTypes.array,
	rowSelection: PropTypes.string,
	rowHeight: PropTypes.number,
	deltaRowDataMode: PropTypes.bool,
	rowBuffer: PropTypes.number,
	rowNodeIdentifier: PropTypes.string,
};

export default DATAGRID_PROPTYPES;
