'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PIN_HEADER_RENDERER_COMPONENT = undefined;
exports.default = DefaultPinHeaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactComponents = require('@talend/react-components');

var _pinHeaderRenderer = require('./pin-header-renderer.scss');

var _pinHeaderRenderer2 = _interopRequireDefault(_pinHeaderRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PIN_HEADER_RENDERER_COMPONENT = exports.PIN_HEADER_RENDERER_COMPONENT = 'pinHeaderRenderer';

function DefaultPinHeaderRenderer() {
	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)(_pinHeaderRenderer2.default['td-pin-header'], 'td-pin-header') },
		_react2.default.createElement(_reactComponents.Icon, { name: 'talend-burger' })
	);
}