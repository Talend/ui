'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _constants = require('../constants');

var _defaultCellRenderer = require('./default-cell-renderer.component');

var _defaultCellRenderer2 = _interopRequireDefault(_defaultCellRenderer);

var _qualityIndicator = require('./quality-indicator.component');

var _qualityIndicator2 = _interopRequireDefault(_qualityIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComponent() {}

describe('#DefaultCellRenderer', function () {
	it('should render DefaultCellRenderer with TALEND_QUALITY_EMPTY_KEY quality cell', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_defaultCellRenderer2.default, {
			avroRenderer: { stringCellRenderer: 'StringRenderer' },
			colDef: { avro: { type: 'string' } },
			value: { quality: _constants.TALEND_QUALITY_EMPTY_KEY },
			getComponent: getComponent
		}));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(_qualityIndicator2.default).length).toBe(1);
	});

	it('should render DefaultCellRenderer with TALEND_QUALITY_INVALID_KEY quality cell', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_defaultCellRenderer2.default, {
			avroRenderer: { stringCellRenderer: 'StringRenderer' },
			colDef: { avro: { type: 'string' } },
			value: { quality: _constants.TALEND_QUALITY_INVALID_KEY },
			getComponent: getComponent
		}));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(_qualityIndicator2.default).length).toBe(1);
	});

	it('should render DefaultCellRenderer with TALEND_QUALITY_VALID_KEY quality cell', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_defaultCellRenderer2.default, {
			avroRenderer: { stringCellRenderer: 'StringRenderer' },
			colDef: { avro: { type: 'string' } },
			value: { quality: _constants.TALEND_QUALITY_VALID_KEY },
			getComponent: getComponent
		}));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(_qualityIndicator2.default).length).toBe(0);
	});
});