'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = DataGrid;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _components = require('../components/');

var _components2 = _interopRequireDefault(_components);

var _datagrid = require('../components/datagrid.proptypes');

var _datagrid2 = _interopRequireDefault(_datagrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DataGrid(props) {
	var onFocusedCell = function onFocusedCell(event) {
		if (props.onFocusedCell) {
			props.onFocusedCell(event);
		}

		if ((0, _get2.default)(props, 'actionCreators.onFocusedCell')) {
			props.dispatchActionCreator((0, _get2.default)(props, 'actionCreators.onFocusedCell'), event, {
				props: props
			});
		}
	};

	var onFocusedColumn = function onFocusedColumn(event) {
		if (props.onFocusedColumn) {
			props.onFocusedColumn(event);
		}

		if ((0, _get2.default)(props, 'actionCreators.onFocusedColumn')) {
			props.dispatchActionCreator((0, _get2.default)(props, 'actionCreators.onFocusedColumn'), event, {
				props: props
			});
		}
	};

	return _react2.default.createElement(_components2.default, _extends({}, props, {
		data: props.sourceData,
		onFocusedCell: onFocusedCell,
		onFocusedColumn: onFocusedColumn
	}));
}

DataGrid.propTypes = _extends({}, _datagrid2.default, {
	sourceData: _propTypes2.default.object,
	actionCreators: _propTypes2.default.shape({
		onFocusedCell: _propTypes2.default.string,
		onFocusedColumn: _propTypes2.default.string
	})
});

DataGrid.displayName = 'Container(DataGrid)';