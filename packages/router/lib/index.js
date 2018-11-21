'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _effects = require('redux-saga/effects');

var _UIRouter = require('./UIRouter');

var _UIRouter2 = _interopRequireDefault(_UIRouter);

var _sagaRouter = require('./sagaRouter');

var _sagaRouter2 = _interopRequireDefault(_sagaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getModule(options) {
	var _marked = /*#__PURE__*/regeneratorRuntime.mark(saga);

	var history = options.history || _reactRouter.hashHistory;
	function saga() {
		return regeneratorRuntime.wrap(function saga$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!options.sagaRouterConfig) {
							_context.next = 3;
							break;
						}

						_context.next = 3;
						return (0, _effects.fork)(_sagaRouter2.default, history, options.sagaRouterConfig);

					case 3:
					case 'end':
						return _context.stop();
				}
			}
		}, _marked, this);
	}
	var middlewares = [(0, _reactRouterRedux.routerMiddleware)(history)];
	var routerHistory = void 0;
	function storeCallback(store) {
		routerHistory = (0, _reactRouterRedux.syncHistoryWithStore)(history, store);
	}
	// router is renderer after the store is created so we refer to routerHistory
	function Router() {
		return _react2.default.createElement(_UIRouter2.default, { history: routerHistory });
	}
	var components = {
		Router: Router
	};
	return {
		id: 'react-cmf-router',
		reducer: {
			routing: _reactRouterRedux.routerReducer
		},
		components: components,
		middlewares: middlewares,
		saga: saga,
		storeCallback: storeCallback
	};
}

// cmfModule
exports.default = getModule;