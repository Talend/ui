'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @module react-cmf/lib/sagaRouter
                                                                                                                                                                                                                                                                               * @example
                                                                                                                                                                                                                                                                               *	import { sagaRouter } from '@talend/react-cmf';
                                                                                                                                                                                                                                                                               *	import { browserHistory as history } from 'react-router';
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                               *	const CANCEL_ACTION = 'CANCEL_ACTION';
                                                                                                                                                                                                                                                                               *	// route configuration, a url fragment match with a generator
                                                                                                                                                                                                                                                                               *	const routes = {
                                                                                                                                                                                                                                                                               *		"/datasets/add": function* addDataset() {
                                                                                                                                                                                                                                                                               *			yield take(CANCEL_ACTION);
                                                                                                                                                                                                                                                                               *			yield put({
                                                                                                                                                                                                                                                                               *				type: REDIRECT_ADD_DATASET_CANCEL,
                                                                                                                                                                                                                                                                               *				cmf: {
                                                                                                                                                                                                                                                                               *					routerReplace: "/datasets"
                                                                                                                                                                                                                                                                               *				}
                                                                                                                                                                                                                                                                               *			});
                                                                                                                                                                                                                                                                               *		},
                                                                                                                                                                                                                                                                               *		"/connections/:datastoreId/edit/add-dataset": function* addDataset({
                                                                                                                                                                                                                                                                               *			datastoreId
                                                                                                                                                                                                                                                                               *		}) {
                                                                                                                                                                                                                                                                               *			yield take(CANCEL_ACTION);
                                                                                                                                                                                                                                                                               *			yield put({
                                                                                                                                                                                                                                                                               *				type: REDIRECT_CONNECTION_ADD_DATASET_CANCEL,
                                                                                                                                                                                                                                                                               *				cmf: {
                                                                                                                                                                                                                                                                               *					routerReplace: `/connections/${datastoreId}/edit`
                                                                                                                                                                                                                                                                               *				}
                                                                                                                                                                                                                                                                               *			});
                                                                                                                                                                                                                                                                               *		}
                                                                                                                                                                                                                                                                               *	};
                                                                                                                                                                                                                                                                               *	// router saga is forked and given router history, and route configuration
                                                                                                                                                                                                                                                                               *	yield fork(routerSaga, history, routes);
                                                                                                                                                                                                                                                                               */


exports.default = sagaRouter;

var _effects = require('redux-saga/effects');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _matchPath = require('./matchPath');

var _matchPath2 = _interopRequireDefault(_matchPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(sagaRouter);

// TODO: Maybe saga shuld be implemented as a complete Maybe Monad

/**
 * @typedef {Object} Location
 * @param {string} pathname
 */

/**
 * @typedef {Object.<string, number>} RouteParams
 */

/**
 * @typedef {Object.<string, Task>} RunningTasks
 */

/**
 * @function RouteSaga
 * @param {RouteParams} params
 */

/**
 * @typedef {Object} MaybeSaga
 * @property {Task} saga - non optionalref on a Task
 */

/**
 * @typedef {Object.<string, RouteSaga>} RoutesConfig
 */

/**
 * The Match object resulting from matching a saga route fragment and an URL
 * @typedef {Object} Match
 * @property {string} path - the path pattern used to match the saga.
 * @property {string} url - the matched portion of the application URL.
 * @property {boolean} isExact - whether or not the saga matched exactly.
 * @property {RouteParams} params - ad dictionnary of the resolved parameters.
 */

/**
 * Determine if a saga should be restarted with the following rules :
 *
 * @param {MaybeSaga} maybeSaga
 * @param {Match} match
 * @param {RouteSaga} routeSaga
 */
function shouldStartSaga(maybeSaga, match, routeSaga) {
  if (match) {
    if (!maybeSaga || maybeSaga && maybeSaga.saga && !maybeSaga.saga.isRunning()) {
      if (routeSaga.runOnExactMatch === true) {
        return match.isExact;
      }
      return true;
    }
  }
  return false;
}

/**
 * Determine if a saga should be canceled with the following rules :
 *
 * @param {MaybeSaga} maybeSaga
 * @param {Match} match
 * @param {RouteSaga} routeSaga
 */
function shouldCancelSaga(maybeSaga, match, routeSaga) {
  if (maybeSaga && maybeSaga.saga.isRunning()) {
    if (!match || routeSaga.runOnExactMatch === true) {
      return true;
    }
  }
  return false;
}

/**
 * Determine if a saga should be restarted with the following rules:
 *
 * @param {MaybeSaga} maybeSaga
 * @param {Match} match
 * @param {RouteSaga} routeSaga
 */
function shouldRestartSaga(maybeSaga, match, routeSaga) {
  if (match) {
    if (maybeSaga) {
      if (routeSaga.restartOnRouteChange === true || !(0, _isEqual2.default)(maybeSaga.match.params, match.params)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * for a route a list of running saga and current location return a
 * match object and a saga
 *
 * @param {string} routeFragments - the route fragment associated to a saga
 * @param {RunningTasks} sagas
 * @param {Location} currentLocation
 * @param {int} index
 */
function parseSagaState(routeFragment, sagas, currentLocation) {
  return {
    match: (0, _matchPath2.default)(currentLocation.pathname, { path: routeFragment }),
    maybeSaga: sagas[routeFragment]
  };
}

/**
 * responsible to start and cancel saga based on application current url,
 * restart saga if necessary
 * @param {object} history - react router history
 * @param {RoutesConfig} routes
 */
function sagaRouter(history, routes) {
  var sagas, routeFragments, shouldStart, currentLocation, index, routeFragment, routeSaga, _parseSagaState, match, maybeSaga, _index, _shouldStart$_index, _routeFragment, _match, _routeSaga;

  return regeneratorRuntime.wrap(function sagaRouter$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sagas = {};
          routeFragments = Object.keys(routes);

        case 2:
          if (!true) {
            _context.next = 42;
            break;
          }

          _context.next = 5;
          return (0, _effects.take)('@@router/LOCATION_CHANGE');

        case 5:
          shouldStart = [];
          currentLocation = history.getCurrentLocation();
          index = 0;

        case 8:
          if (!(index < routeFragments.length)) {
            _context.next = 27;
            break;
          }

          routeFragment = routeFragments[index];
          routeSaga = routes[routeFragment];
          _parseSagaState = parseSagaState(routeFragment, sagas, currentLocation), match = _parseSagaState.match, maybeSaga = _parseSagaState.maybeSaga;

          if (!shouldCancelSaga(maybeSaga, match, routeSaga)) {
            _context.next = 17;
            break;
          }

          _context.next = 15;
          return (0, _effects.cancel)(maybeSaga.saga);

        case 15:
          _context.next = 24;
          break;

        case 17:
          if (!shouldRestartSaga(maybeSaga, match, routeSaga)) {
            _context.next = 23;
            break;
          }

          _context.next = 20;
          return (0, _effects.cancel)(maybeSaga.saga);

        case 20:
          shouldStart.push({ routeFragment: routeFragment, match: match });
          _context.next = 24;
          break;

        case 23:
          if (shouldStartSaga(maybeSaga, match, routeSaga)) {
            shouldStart.push({ routeFragment: routeFragment, match: match });
          }

        case 24:
          index += 1;

        case 25:
          _context.next = 8;
          break;

        case 27:
          _index = 0;

        case 28:
          if (!(_index < shouldStart.length)) {
            _context.next = 40;
            break;
          }

          _shouldStart$_index = shouldStart[_index], _routeFragment = _shouldStart$_index.routeFragment, _match = _shouldStart$_index.match;
          _routeSaga = routes[_routeFragment];

          if (_typeof(routes[_routeFragment]) === 'object') {
            _routeSaga = routes[_routeFragment].saga;
          }
          _context.next = 34;
          return (0, _effects.spawn)(_routeSaga, _match.params, _match.isExact);

        case 34:
          _context.t0 = _context.sent;
          _context.t1 = _match;
          sagas[_routeFragment] = {
            saga: _context.t0,
            match: _context.t1
          };

          _index += 1;

        case 38:
          _context.next = 28;
          break;

        case 40:
          _context.next = 2;
          break;

        case 42:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}