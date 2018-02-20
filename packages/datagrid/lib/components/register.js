'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = registerAllComponents;

var _reactCmf = require('@talend/react-cmf');

var _defaultCellRenderer = require('./default-cell-renderer');

var _defaultCellRenderer2 = _interopRequireDefault(_defaultCellRenderer);

var _defaultHeaderRenderer = require('./default-header-renderer');

var _defaultHeaderRenderer2 = _interopRequireDefault(_defaultHeaderRenderer);

var _defaultPinHeaderRenderer = require('./default-pin-header-renderer');

var _defaultPinHeaderRenderer2 = _interopRequireDefault(_defaultPinHeaderRenderer);

var _stringCellRenderer = require('./string-cell-renderer/');

var _stringCellRenderer2 = _interopRequireDefault(_stringCellRenderer);

var _intCellRenderer = require('./int-cell-renderer');

var _intCellRenderer2 = _interopRequireDefault(_intCellRenderer);

var _booleanCellRenderer = require('./boolean-cell-renderer');

var _booleanCellRenderer2 = _interopRequireDefault(_booleanCellRenderer);

var _dateCellRenderer = require('./date-cell-renderer');

var _dateCellRenderer2 = _interopRequireDefault(_dateCellRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerAllComponents() {
	_reactCmf.api.component.register('DefaultCellRenderer', _defaultCellRenderer2.default);
	_reactCmf.api.component.register('DefaultHeaderRenderer', _defaultHeaderRenderer2.default);
	_reactCmf.api.component.register('DefaultPinHeaderRenderer', _defaultPinHeaderRenderer2.default);
	_reactCmf.api.component.register('DefaultStringCellRenderer', _stringCellRenderer2.default);
	_reactCmf.api.component.register('DefaultIntCellRenderer', _intCellRenderer2.default);
	_reactCmf.api.component.register('DefaultBooleanCellRenderer', _booleanCellRenderer2.default);
	_reactCmf.api.component.register('DefaultDateCellRenderer', _dateCellRenderer2.default);
}