'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = QualityIndicator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../constants');

var _qualityIndicator = require('./quality-indicator.scss');

var _qualityIndicator2 = _interopRequireDefault(_qualityIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function QualityIndicator(props) {
	var _classNames;

	return _react2.default.createElement('div', {
		className: (0, _classnames2.default)(_qualityIndicator2.default['td-cell-quality-indicator'], 'td-cell-quality-indicator', (_classNames = {}, _defineProperty(_classNames, _qualityIndicator2.default['td-cell-quality-indicator-invalid'], props.value === _constants.TALEND_QUALITY_INVALID_KEY), _defineProperty(_classNames, _qualityIndicator2.default['td-cell-quality-indicator-empty'], props.value === _constants.TALEND_QUALITY_EMPTY_KEY), _classNames)),
		title: props.tooltip
	});
}

QualityIndicator.propTypes = {
	tooltip: _propTypes2.default.string,
	value: _propTypes2.default.oneOf([_constants.TALEND_QUALITY_INVALID_KEY, _constants.TALEND_QUALITY_EMPTY_KEY])
};