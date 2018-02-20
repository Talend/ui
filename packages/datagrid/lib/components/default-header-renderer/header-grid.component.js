'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HEADER_RENDERER_COMPONENT = undefined;

var _PropTypes$shape;

exports.default = DefaultHeaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _qualityBar = require('./quality-bar.component');

var _qualityBar2 = _interopRequireDefault(_qualityBar);

var _headerGrid = require('./header-grid.scss');

var _headerGrid2 = _interopRequireDefault(_headerGrid);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HEADER_RENDERER_COMPONENT = exports.HEADER_RENDERER_COMPONENT = 'headerGrid';

function DefaultHeaderRenderer(_ref) {
	var column = _ref.column,
	    displayName = _ref.displayName,
	    onFocusedColumn = _ref.onFocusedColumn;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)(_headerGrid2.default['td-header-component'], 'td-header-component') },
		_react2.default.createElement(
			'button',
			{ className: (0, _classnames2.default)(_headerGrid2.default.header), onClick: function onClick() {
					return onFocusedColumn(column.colId);
				} },
			_react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(_headerGrid2.default['header-first-line']) },
				_react2.default.createElement(
					'span',
					{ className: (0, _classnames2.default)(_headerGrid2.default['header-column-label']), title: displayName },
					displayName
				),
				_react2.default.createElement(
					'span',
					{ className: (0, _classnames2.default)(_headerGrid2.default['header-other-actions']) },
					'...'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(_headerGrid2.default['header-second-line']) },
				column.colDef.type
			)
		),
		column.colDef[_constants.TALEND_QUALITY_KEY] && _react2.default.createElement(_qualityBar2.default, {
			invalid: column.colDef[_constants.TALEND_QUALITY_KEY][_constants.TALEND_QUALITY_INVALID_KEY],
			empty: column.colDef[_constants.TALEND_QUALITY_KEY][_constants.TALEND_QUALITY_EMPTY_KEY],
			valid: column.colDef[_constants.TALEND_QUALITY_KEY][_constants.TALEND_QUALITY_VALID_KEY]
		})
	);
}

DefaultHeaderRenderer.propTypes = {
	column: _propTypes2.default.shape({
		colDef: _propTypes2.default.shape(_defineProperty({}, _constants.TALEND_QUALITY_KEY, _propTypes2.default.shape((_PropTypes$shape = {}, _defineProperty(_PropTypes$shape, _constants.TALEND_QUALITY_EMPTY_KEY, _propTypes2.default.number), _defineProperty(_PropTypes$shape, _constants.TALEND_QUALITY_INVALID_KEY, _propTypes2.default.number), _defineProperty(_PropTypes$shape, _constants.TALEND_QUALITY_VALID_KEY, _propTypes2.default.number), _PropTypes$shape))))
	}),
	displayName: _propTypes2.default.string,
	onFocusedColumn: _propTypes2.default.func
};