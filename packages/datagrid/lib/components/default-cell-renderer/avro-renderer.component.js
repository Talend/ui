'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = DefaultTypeRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactComponents = require('@talend/react-components');

var _datagrid = require('../datagrid.proptypes');

var _datagrid2 = _interopRequireDefault(_datagrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DefaultTypeRenderer(_ref) {
	var avroRenderer = _ref.avroRenderer,
	    colDef = _ref.colDef,
	    data = _ref.data,
	    getComponent = _ref.getComponent;

	var componentId = avroRenderer[colDef.avro.type.type + 'CellRenderer'];

	return _react2.default.createElement(_reactComponents.Inject, { getComponent: getComponent, component: componentId, data: data, colDef: colDef });
}

DefaultTypeRenderer.propTypes = {
	avroRenderer: _datagrid2.default.avroRenderer,
	colDef: _propTypes2.default.shape({
		avro: _propTypes2.default.shape({
			type: _propTypes2.default.shape({
				type: _propTypes2.default.oneOf(['boolean', 'date', 'int', 'string'])
			})
		})
	}),
	data: _propTypes2.default.object,
	getComponent: _propTypes2.default.func
};