'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _pinHeaderRenderer = require('./pin-header-renderer.component');

var _pinHeaderRenderer2 = _interopRequireDefault(_pinHeaderRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#DefaultBooleanCellRenderer', function () {
	it('should render DefaultBooleanCellRenderer', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_pinHeaderRenderer2.default, null));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});