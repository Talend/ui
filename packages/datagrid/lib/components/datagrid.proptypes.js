'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATAGRID_PROPTYPES = {
	avroRenderer: _propTypes2.default.shape({
		booleanCellRenderer: _propTypes2.default.string,
		dateCellRenderer: _propTypes2.default.string,
		intCellRenderer: _propTypes2.default.string,
		stringCellRenderer: _propTypes2.default.string
	}),
	cellRenderer: _propTypes2.default.string,
	getComponent: _propTypes2.default.func,
	getPinnedColumnDefsFn: _propTypes2.default.func,
	getColumnDefsFn: _propTypes2.default.func,
	getRowDataFn: _propTypes2.default.func,
	getValueGetterFn: _propTypes2.default.func,
	headerHeight: _propTypes2.default.number,
	headerRenderer: _propTypes2.default.string,
	onFocusedCell: _propTypes2.default.func,
	onFocusedColumn: _propTypes2.default.func,
	pinHeaderRenderer: _propTypes2.default.string,
	data: _propTypes2.default.object,
	rowSelection: _propTypes2.default.string,
	rowHeight: _propTypes2.default.number,
	theme: _propTypes2.default.string
};

exports.default = DATAGRID_PROPTYPES;