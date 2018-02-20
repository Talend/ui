'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.injectedHeaderRenderer = injectedHeaderRenderer;
exports.injectedCellRenderer = injectedCellRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _agGridReact = require('ag-grid-react');

require('ag-grid/dist/styles/ag-grid.css');

var _reactComponents = require('@talend/react-components');

var _defaultHeaderRenderer = require('./default-header-renderer');

var _defaultCellRenderer = require('./default-cell-renderer');

var _defaultPinHeaderRenderer = require('./default-pin-header-renderer');

var _datagrid = require('./datagrid.proptypes');

var _constants = require('./constants');

var _sampleSerializer = require('./sample-serializer');

var _sampleSerializer2 = _interopRequireDefault(_sampleSerializer);

var _datagrid2 = require('./datagrid.scss');

var _datagrid3 = _interopRequireDefault(_datagrid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FOCUSED_COLUMN_CLASS_NAME = 'column-focus';
var AG_GRID_CUSTOM_HEADER_KEY = 'headerComponent';
var AG_GRID_CUSTOM_CELL_KEY = 'cellRenderer';
var AG_GRID_DEFAULT_ROW_SELECTION = 'single';
var HEADER_HEIGHT = 69;
var ROW_HEIGHT = 39;

function injectedHeaderRenderer(getComponent, headerRenderer, onFocusedColumn) {
	var Component = _reactComponents.Inject.get(getComponent, headerRenderer);

	return function (props) {
		return _react2.default.createElement(Component, _extends({}, props, { onFocusedColumn: onFocusedColumn }));
	};
}

function injectedCellRenderer(getComponent, cellRenderer, avroRenderer) {
	var Component = _reactComponents.Inject.get(getComponent, cellRenderer);

	return function (props) {
		return _react2.default.createElement(Component, _extends({}, props, { avroRenderer: avroRenderer, getComponent: getComponent }));
	};
}

function getAvroRenderer(avroRenderer) {
	return _extends({
		booleanCellRenderer: 'DefaultBooleanCellRenderer',
		dateCellRenderer: 'DefaultDateCellRenderer',
		intCellRenderer: 'DefaultIntCellRenderer',
		stringCellRenderer: 'DefaultStringCellRenderer'
	}, avroRenderer);
}

var DataGrid = function (_React$Component) {
	_inherits(DataGrid, _React$Component);

	function DataGrid(props) {
		_classCallCheck(this, DataGrid);

		var _this = _possibleConstructorReturn(this, (DataGrid.__proto__ || Object.getPrototypeOf(DataGrid)).call(this, props));

		_this.handleKeyboard = _this.handleKeyboard.bind(_this);
		_this.onFocusedColumn = _this.onFocusedColumn.bind(_this);
		_this.onFocusedCell = _this.onFocusedCell.bind(_this);
		_this.onGridReady = _this.onGridReady.bind(_this);
		_this.setGridElement = _this.setGridElement.bind(_this);
		_this.setCurrentFocusedColumn = _this.setCurrentFocusedColumn.bind(_this);
		_this.updateStyleFocusColumn = _this.updateStyleFocusColumn.bind(_this);
		return _this;
	}

	_createClass(DataGrid, [{
		key: 'onGridReady',
		value: function onGridReady(_ref) {
			var api = _ref.api;

			this.gridAPI = api;
		}
	}, {
		key: 'onFocusedCell',
		value: function onFocusedCell(_ref2) {
			var column = _ref2.column,
			    rest = _objectWithoutProperties(_ref2, ['column']);

			if (!column) {
				return;
			}

			if (column.colId !== this.currentColId || column.pinned) {
				this.removeFocusColumn();
			}

			this.setCurrentFocusedColumn(column.colId);

			if (column.pinned) {
				return;
			}

			this.updateStyleFocusColumn();

			if (this.props.onFocusedCell) {
				this.props.onFocusedCell(_extends({
					column: column
				}, rest));
			}
		}
	}, {
		key: 'onFocusedColumn',
		value: function onFocusedColumn(colId) {
			var selectedRowIndex = 0;
			if (this.gridAPI.getFocusedCell()) {
				selectedRowIndex = this.gridAPI.getFocusedCell().rowIndex;
			}

			if (colId !== this.currentColId) {
				this.removeFocusColumn();
			}

			this.setCurrentFocusedColumn(colId);
			this.gridAPI.setFocusedCell(selectedRowIndex, colId);
			this.updateStyleFocusColumn();
			this.props.onFocusedColumn(colId);
		}
	}, {
		key: 'setCurrentFocusedColumn',
		value: function setCurrentFocusedColumn(colId) {
			this.currentColId = colId;
		}
	}, {
		key: 'setGridElement',
		value: function setGridElement(element) {
			this.gridElement = element;
		}
	}, {
		key: 'removeFocusColumn',
		value: function removeFocusColumn() {
			// eslint-disable-next-line react/no-find-dom-node
			var focusedCells = _reactDom2.default.findDOMNode(this.gridElement).querySelectorAll('.' + FOCUSED_COLUMN_CLASS_NAME);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = focusedCells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var focusedCell = _step.value;

					focusedCell.classList.remove(FOCUSED_COLUMN_CLASS_NAME);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'updateStyleFocusColumn',
		value: function updateStyleFocusColumn() {
			var colId = this.currentColId;

			if (!colId || colId.includes(_constants.NAMESPACE_INDEX)) {
				return;
			}

			/*
   	This is a bad pratice to manipulate straight the DOM.
   	But we can't the choice if we want hightlight the column.
   	There is a issue on ag-grid to request a feature like this.
   	https://github.com/ag-grid/ag-grid/issues/2216
   	When Ag-grid implement this feature, we can't remove the below code
   */
			// eslint-disable-next-line react/no-find-dom-node
			var columnsCells = _reactDom2.default.findDOMNode(this.gridElement).querySelectorAll('[col-id="' + colId + '"]:not(.' + FOCUSED_COLUMN_CLASS_NAME + ')');

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = columnsCells[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var columnCell = _step2.value;

					columnCell.classList.add(FOCUSED_COLUMN_CLASS_NAME);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'handleKeyboard',
		value: function handleKeyboard(_ref3) {
			var nextCellDef = _ref3.nextCellDef,
			    previousCellDef = _ref3.previousCellDef;

			if (!nextCellDef) {
				return null;
			}

			if (previousCellDef.rowIndex !== nextCellDef.rowIndex) {
				if (this.gridAPI) {
					this.gridAPI.getDisplayedRowAtIndex(nextCellDef.rowIndex).setSelected(true, true);
				}
			}

			return nextCellDef;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this,
			    _agGridOptions$framew;

			var agGridOptions = {
				headerHeight: this.props.headerHeight,
				tabToNextCell: this.handleKeyboard,
				navigateToNextCell: this.handleKeyboard,
				onViewportChanged: this.updateStyleFocusColumn,
				onVirtualColumnsChanged: this.updateStyleFocusColumn,
				ref: this.setGridElement,
				rowData: this.props.getRowDataFn(this.props.data),
				rowHeight: this.props.rowHeight,
				rowSelection: this.props.rowSelection,
				suppressDragLeaveHidesColumns: true,
				onCellFocused: this.onFocusedCell,
				onGridReady: this.onGridReady
			};

			var pinnedColumnDefs = this.props.getPinnedColumnDefsFn(this.props.data);
			var columnDefs = this.props.getColumnDefsFn(this.props.data);

			if (pinnedColumnDefs) {
				agGridOptions.columnDefs = pinnedColumnDefs.map(function (pinnedColumnDefinition) {
					return _extends({
						lockPosition: true,
						pinned: 'left',
						valueGetter: _this2.props.getValueGetterFn
					}, pinnedColumnDefinition, _defineProperty({}, AG_GRID_CUSTOM_HEADER_KEY, _defaultPinHeaderRenderer.PIN_HEADER_RENDERER_COMPONENT));
				});
			}

			if (columnDefs) {
				var columnsDefs = columnDefs.map(function (columnDefinition) {
					var _extends3;

					return _extends({
						lockPinned: true,
						valueGetter: _this2.props.getValueGetterFn
					}, columnDefinition, (_extends3 = {}, _defineProperty(_extends3, AG_GRID_CUSTOM_CELL_KEY, _defaultCellRenderer.CELL_RENDERER_COMPONENT), _defineProperty(_extends3, AG_GRID_CUSTOM_HEADER_KEY, _defaultHeaderRenderer.HEADER_RENDERER_COMPONENT), _extends3));
				});
				agGridOptions.columnDefs = [].concat(_toConsumableArray(agGridOptions.columnDefs), _toConsumableArray(columnsDefs));
			}

			agGridOptions.frameworkComponents = (_agGridOptions$framew = {}, _defineProperty(_agGridOptions$framew, _defaultCellRenderer.CELL_RENDERER_COMPONENT, injectedCellRenderer(this.props.getComponent, this.props.cellRenderer, getAvroRenderer(this.props.avroRenderer))), _defineProperty(_agGridOptions$framew, _defaultHeaderRenderer.HEADER_RENDERER_COMPONENT, injectedHeaderRenderer(this.props.getComponent, this.props.headerRenderer, this.onFocusedColumn)), _defineProperty(_agGridOptions$framew, _defaultPinHeaderRenderer.PIN_HEADER_RENDERER_COMPONENT, _reactComponents.Inject.get(this.props.getComponent, this.props.pinHeaderRenderer)), _agGridOptions$framew);

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(_datagrid3.default['td-grid'], _datagrid3.default[this.props.theme], 'td-grid') },
				_react2.default.createElement(_agGridReact.AgGridReact, agGridOptions)
			);
		}
	}]);

	return DataGrid;
}(_react2.default.Component);

DataGrid.defaultProps = {
	cellRenderer: 'DefaultCellRenderer',
	getPinnedColumnDefsFn: _sampleSerializer2.default.getPinnedColumnDefsFromSample,
	getColumnDefsFn: _sampleSerializer2.default.getColumnDefsFromSample,
	getRowDataFn: _sampleSerializer2.default.getRowDataFromSample,
	getValueGetterFn: _sampleSerializer2.default.valueGetterFromRowData,
	headerHeight: HEADER_HEIGHT,
	headerRenderer: 'DefaultHeaderRenderer',
	pinHeaderRenderer: 'DefaultPinHeaderRenderer',
	rowHeight: ROW_HEIGHT,
	rowSelection: AG_GRID_DEFAULT_ROW_SELECTION
};
DataGrid.propTypes = _datagrid.DATAGRID_PROPTYPES;
exports.default = DataGrid;