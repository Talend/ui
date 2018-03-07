import PropTypes from 'prop-types';

const DATAGRID_PROPTYPES = {
	avroRenderer: PropTypes.shape({
		booleanCellRenderer: PropTypes.string,
		dateCellRenderer: PropTypes.string,
		intCellRenderer: PropTypes.string,
		stringCellRenderer: PropTypes.string,
	}),
	cellRenderer: PropTypes.string,
	className: PropTypes.string,
	loading: PropTypes.bool,
	getComponent: PropTypes.func,
	getPinnedColumnDefsFn: PropTypes.func,
	getColumnDefsFn: PropTypes.func,
	getRowDataFn: PropTypes.func,
	getCellValueFn: PropTypes.func,
	headerHeight: PropTypes.number,
	headerRenderer: PropTypes.string,
	onFocusedCell: PropTypes.func,
	onFocusedColumn: PropTypes.func,
	onVerticalScroll: PropTypes.func,
	pinHeaderRenderer: PropTypes.string,
	data: PropTypes.object,
	rowSelection: PropTypes.string,
	rowHeight: PropTypes.number,
};

export default DATAGRID_PROPTYPES;
