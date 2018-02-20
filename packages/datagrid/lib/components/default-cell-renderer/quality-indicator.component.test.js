'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _qualityIndicator = require('./quality-indicator.component');

var _qualityIndicator2 = _interopRequireDefault(_qualityIndicator);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#DefaultBooleanCellRenderer', function () {
	it('should render DefaultBooleanCellRenderer', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_qualityIndicator2.default, { value: _constants.TALEND_QUALITY_INVALID_KEY, tooltip: 'Incorrect value' }));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should handle when TALEND_QUALITY_INVALID_KEY value', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_qualityIndicator2.default, { value: _constants.TALEND_QUALITY_INVALID_KEY, tooltip: 'Incorrect value' }));
		// then
		expect(wrapper.find('.td-cell-quality-indicator-invalid').length).toBe(1);
		expect(wrapper.find('.td-cell-quality-indicator-empty').length).toBe(0);
	});

	it('should handle when TALEND_QUALITY_EMPTY_KEY value', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_qualityIndicator2.default, { value: _constants.TALEND_QUALITY_EMPTY_KEY, tooltip: 'Empty value' }));
		// then
		expect(wrapper.find('.td-cell-quality-indicator-invalid').length).toBe(0);
		expect(wrapper.find('.td-cell-quality-indicator-empty').length).toBe(1);
	});
});