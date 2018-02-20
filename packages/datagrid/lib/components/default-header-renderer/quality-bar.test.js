'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _qualityBar = require('./quality-bar.component');

var _qualityBar2 = _interopRequireDefault(_qualityBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#DefaultBooleanCellRenderer', function () {
	it('should render DefaultBooleanCellRenderer', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_qualityBar2.default, { invalid: 33, empty: 33, valid: 34 }));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});