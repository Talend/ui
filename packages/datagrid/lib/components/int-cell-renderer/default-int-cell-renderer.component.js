'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = DefaultIntCellRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultIntCell = require('./default-int-cell.scss');

var _defaultIntCell2 = _interopRequireDefault(_defaultIntCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DefaultIntCellRenderer(_ref) {
	var data = _ref.data;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)(_defaultIntCell2.default['td-cell-int'], 'td-cell-int') },
		data.value
	);
}

DefaultIntCellRenderer.propTypes = {
	data: _propTypes2.default.shape({
		value: _propTypes2.default.string
	})
};