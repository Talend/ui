'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = DefaultDateCellRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DefaultDateCellRenderer(_ref) {
	var data = _ref.data;

	return _react2.default.createElement(
		'span',
		null,
		data.value
	);
}

DefaultDateCellRenderer.propTypes = {
	data: _propTypes2.default.shape({
		value: _propTypes2.default.string
	})
};