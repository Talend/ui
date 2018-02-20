'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = DefaultStringCellRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DefaultStringCellRenderer(_ref) {
	var data = _ref.data;

	return _react2.default.createElement(
		'span',
		null,
		data.value
	);
}