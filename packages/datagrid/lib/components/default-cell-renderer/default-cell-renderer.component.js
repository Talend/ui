'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CELL_RENDERER_COMPONENT = undefined;
exports.default = DefaultCellRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _datagrid = require('../datagrid.proptypes');

var _datagrid2 = _interopRequireDefault(_datagrid);

var _qualityIndicator = require('./quality-indicator.component');

var _qualityIndicator2 = _interopRequireDefault(_qualityIndicator);

var _avroRenderer = require('./avro-renderer.component');

var _avroRenderer2 = _interopRequireDefault(_avroRenderer);

var _defaultCell = require('./default-cell.scss');

var _defaultCell2 = _interopRequireDefault(_defaultCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CELL_RENDERER_COMPONENT = exports.CELL_RENDERER_COMPONENT = 'cellRenderer';

function DefaultCellRenderer(_ref) {
	var avroRenderer = _ref.avroRenderer,
	    colDef = _ref.colDef,
	    value = _ref.value,
	    getComponent = _ref.getComponent;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)(_defaultCell2.default['td-cell'], 'td-cell') },
		value.quality <= 0 && _react2.default.createElement(_qualityIndicator2.default, { tooltip: 'Incorrect value', value: value.quality }),
		_react2.default.createElement(_avroRenderer2.default, {
			colDef: colDef,
			data: value,
			avroRenderer: avroRenderer,
			getComponent: getComponent
		})
	);
}

DefaultCellRenderer.propTypes = {
	avroRenderer: _datagrid2.default.avroRenderer,
	colDef: _propTypes2.default.shape({
		avro: _propTypes2.default.shape({
			type: _propTypes2.default.shape({
				type: _propTypes2.default.oneOf(['boolean', 'date', 'int', 'string'])
			})
		})
	}),
	value: _propTypes2.default.object,
	getComponent: _propTypes2.default.func
};