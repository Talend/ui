'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Internal. Provide low level function to configure CMF to drive react-router.
                                                                                                                                                                                                                                                                   * @module react-cmf/lib/route
                                                                                                                                                                                                                                                                   */

/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }]*/

// import registry from './registry';
// import deprecated from './deprecated';


var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCmf = require('@talend/react-cmf');

var _reactCmf2 = _interopRequireDefault(_reactCmf);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import component from './component';

// const getComponentFromRegistry = deprecated(
// 	(context, id) => component.get(id, context),
// 	'stop use cmf.route.getComponentFromRegistry. Please use cmf.component.get',
// );

// const registerComponent = deprecated(
// 	component.register,
// 	'stop use cmf.route.registerComponent. please use cmf.component.register',
// );

/**
 * register a function for the router configuration
 * @param  {string} id
 * @param  {function} func
 */
function registerFunction(id, func) {
	if (typeof func !== 'function') {
		throw new Error('registerFunction wait for a function');
	}
	_reactCmf2.default.registry.addToRegistry(_constant2.default.REGISTRY_HOOK_PREFIX + ':' + id, func);
}

/**
 * return a function from the router configuration
 * @param  {string} id
 * @param  {object} contextcmf context
 */
function getFunction(id, context) {
	return _reactCmf2.default.registry.getFromRegistry(_constant2.default.REGISTRY_HOOK_PREFIX + ':' + id, context);
}

function withProps(Component, item) {
	if (item.view) {
		// eslint-disable-next-line no-console
		console.warn('DEPRECATED: view is deprecated please use componentId');
	}
	var CMFComponent = Component;
	if (!Component.CMFContainer) {
		CMFComponent = (0, _reactCmf.cmfConnect)({})(Component);
	}
	var WithProps = function WithProps(props) {
		return _react2.default.createElement(CMFComponent, _extends({ view: item.view, componentId: item.componentId }, props));
	};
	WithProps.displayName = 'WithProps';
	WithProps.WrappedComponent = CMFComponent;
	WithProps.propTypes = {
		view: _propTypes2.default.string,
		componentId: _propTypes2.default.string
	};
	return WithProps;
}

/**
 * Internal. Is here to replace all 'component' from an object by their
 * value in the registry. It configures react-router
 * @param  {object} context The react context
 * @param  {object} item The route to adapt
 * @param  {object} dispatch The redux dispatcher
 */
function loadComponents(context, item, dispatch) {
	/* eslint no-param-reassign: ["error", { "props": false }] */
	if (item.component) {
		// we create an HOC to pass item.componentId
		item.component = withProps(_reactCmf2.default.component.get(item.component, context), item);
	}
	if (item.components) {
		// TODO: iterate over all keys to call loadComponents
	}
	if (item.getComponent) {
		item.getComponent = getFunction(item.getComponent, context);
	}
	if (item.getComponents) {
		item.getComponents = getFunction(item.getComponents, context);
	}
	if (item.onEnter) {
		var onEnterFn = getFunction(item.onEnter, context);
		item.onEnter = function onEnter(nextState, replace) {
			return onEnterFn({
				router: {
					nextState: nextState,
					replace: replace
				},
				dispatch: dispatch
			});
		};
	}
	if (item.onLeave) {
		var onLeaveFn = getFunction(item.onLeave, context);
		item.onLeave = function onLeave(nextState, replace) {
			return onLeaveFn({
				router: {
					nextState: nextState,
					replace: replace
				},
				dispatch: dispatch
			});
		};
	}
	if (item.childRoutes) {
		item.childRoutes.forEach(function (route) {
			return loadComponents(context, route, dispatch);
		});
	}
	if (item.indexRoute) {
		loadComponents(context, item.indexRoute, dispatch);
	}
}

/**
 * get the react router configuration 'routes' from our settings
 * @param  {object} context The react context
 * @param  {object} settings The route settings
 * @param  {object} dispatch The redux dispatcher
 * @return {object} react router config
 */
function getRoutesFromSettings(context, settings, dispatch) {
	var copy = _extends({}, settings);
	loadComponents(context, copy, dispatch);
	return copy;
}

exports.default = {
	loadComponents: loadComponents,
	getRoutesFromSettings: getRoutesFromSettings,
	registerFunction: registerFunction,
	getFunction: getFunction
};