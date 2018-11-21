'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _reactCmf = require('@talend/react-cmf');

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} Router
 */

/**
 * pure arrow function that render the router component.
 * You should never need to use this, it's an internal component
 * @param  {object} props   The waited props (history and routes)
 * @param  {object} context The react context with the registry
 * @return {object} ReactElement
 */
/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
function Router(props, context) {
  var routes = _route2.default.getRoutesFromSettings(context, props.routes, props.dispatch);
  if (routes.path === '/' && routes.component) {
    return _react2.default.createElement(_reactRouter.Router, { routes: routes, history: props.history });
  }
  if (props.loading) {
    return _react2.default.createElement(_reactCmf.Inject, { component: props.loading });
  }
  return _react2.default.createElement(
    'div',
    { className: 'is-loading' },
    'loading'
  );
}

Router.propTypes = {
  dispatch: _propTypes2.default.func,
  history: _propTypes2.default.object,
  routes: _propTypes2.default.object,
  loading: _propTypes2.default.node
};
Router.contextTypes = {
  registry: _propTypes2.default.object
};
Router.displayName = 'Router';

var mapStateToProps = function mapStateToProps(state) {
  return { routes: state.cmf.settings.routes };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps)(Router);