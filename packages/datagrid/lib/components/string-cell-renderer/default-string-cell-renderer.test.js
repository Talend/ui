'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _defaultStringCellRenderer = require('./default-string-cell-renderer.component');

var _defaultStringCellRenderer2 = _interopRequireDefault(_defaultStringCellRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#DefaultDateCellRenderer', function () {
	it('should render DefaultDateCellRenderer', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_defaultStringCellRenderer2.default, { data: { value: 'value' } }));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});