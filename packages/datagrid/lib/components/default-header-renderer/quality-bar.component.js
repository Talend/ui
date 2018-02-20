'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = QualityBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _qualityBar = require('./quality-bar.scss');

var _qualityBar2 = _interopRequireDefault(_qualityBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function QualityBar(props) {
	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)(_qualityBar2.default['td-quality-bar'], 'td-quality-bar') },
		_react2.default.createElement('span', {
			className: (0, _classnames2.default)(_qualityBar2.default['td-quality-bar-invalid']),
			style: { width: props.invalid + '%' },
			title: props.invalid + '%'
		}),
		_react2.default.createElement('span', {
			className: (0, _classnames2.default)(_qualityBar2.default['td-quality-bar-empty']),
			style: { width: props.empty + '%' },
			title: props.empty + '%'
		}),
		_react2.default.createElement('span', {
			className: (0, _classnames2.default)(_qualityBar2.default['td-quality-bar-valid']),
			style: { width: props.valid + '%' },
			title: props.valid + '%'
		})
	);
}

QualityBar.propTypes = {
	valid: _propTypes2.default.number,
	empty: _propTypes2.default.number,
	invalid: _propTypes2.default.number
};