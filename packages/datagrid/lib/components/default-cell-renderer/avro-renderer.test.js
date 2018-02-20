'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _avroRenderer = require('./avro-renderer.component');

var _avroRenderer2 = _interopRequireDefault(_avroRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComponent() {}

describe('#DefaultTypeRenderer', function () {
	it('should render DefaultTypeRenderer and load Injected Component stringCellRenderer', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_avroRenderer2.default, {
			avroRenderer: { stringCellRenderer: 'stringCellRenderer' },
			colDef: { avro: { type: { type: 'string' } } },
			data: { value: 'value' },
			getComponent: getComponent
		}));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});