'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _defaultIntCellRenderer = require('./default-int-cell-renderer.component');

var _defaultIntCellRenderer2 = _interopRequireDefault(_defaultIntCellRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#DefaultDateCellRenderer', function () {
	it('should render DefaultDateCellRenderer', function () {
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_defaultIntCellRenderer2.default, { data: { value: 42.42 } }));
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});