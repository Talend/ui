'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _defaultDateCellRenderer = require('./default-date-cell-renderer.component');

var _defaultDateCellRenderer2 = _interopRequireDefault(_defaultDateCellRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#DefaultDateCellRenderer', function () {
	it('should render DefaultDateCellRenderer', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_defaultDateCellRenderer2.default, { data: { value: '14/02/2018' } }));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});