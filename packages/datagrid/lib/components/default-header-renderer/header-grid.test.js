'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _constants = require('../constants');

var _headerGrid = require('./header-grid.component');

var _headerGrid2 = _interopRequireDefault(_headerGrid);

var _qualityBar = require('./quality-bar.component');

var _qualityBar2 = _interopRequireDefault(_qualityBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('#DefaultBooleanCellRenderer', function () {
	it('should render DefaultBooleanCellRenderer', function () {
		var _TALEND_QUALITY_KEY;

		var onFocusedColumn = jest.fn();
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_headerGrid2.default, {
			onFocusedColumn: onFocusedColumn,
			column: {
				colId: 'colId',
				colDef: _defineProperty({
					type: 'string'
				}, _constants.TALEND_QUALITY_KEY, (_TALEND_QUALITY_KEY = {}, _defineProperty(_TALEND_QUALITY_KEY, _constants.TALEND_QUALITY_INVALID_KEY, 33), _defineProperty(_TALEND_QUALITY_KEY, _constants.TALEND_QUALITY_EMPTY_KEY, 33), _defineProperty(_TALEND_QUALITY_KEY, _constants.TALEND_QUALITY_VALID_KEY, 34), _TALEND_QUALITY_KEY))
			},
			displayName: 'Title'
		}));
		wrapper.find('button').simulate('click');
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(onFocusedColumn).toHaveBeenCalledWith('colId');
	});

	it('should render DefaultBooleanCellRenderer without QualityBar', function () {
		var onFocusedColumn = jest.fn();
		var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_headerGrid2.default, {
			onFocusedColumn: onFocusedColumn,
			column: {
				colId: 'colId',
				colDef: {
					type: 'string'
				}
			},
			displayName: 'Title'
		}));
		// then
		expect(wrapper.find(_qualityBar2.default).length).toBe(0);
	});
});