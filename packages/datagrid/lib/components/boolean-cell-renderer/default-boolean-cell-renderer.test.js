'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _defaultBooleanCellRenderer = require('./default-boolean-cell-renderer.component');

var _defaultBooleanCellRenderer2 = _interopRequireDefault(_defaultBooleanCellRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#DefaultBooleanCellRenderer', function () {
	it('should render DefaultBooleanCellRenderer', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_defaultBooleanCellRenderer2.default, { data: { value: true } }));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});