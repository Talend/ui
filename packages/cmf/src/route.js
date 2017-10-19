/**
 * All stuff related to the routing in CMF
 * @module react-cmf/lib/route
 */

/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }]*/

import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';
import registry from './registry';
import { mapStateToViewProps } from './settings';
import deprecated from './deprecated';
import CONST from './constant';
import component from './component';

const getComponentFromRegistry = component.get;
const registerComponent = component.register;

/**
 * register a function for the router configuration
 * @param  {string} id
 * @param  {function} func
 */
function registerFunction(id, func) {
	if ((typeof func) !== 'function') {
		throw new Error('registerFunction wait for a function');
	}
	registry.addToRegistry(`${CONST.REGISTRY_HOOK_PREFIX}:${id}`, func);
}

/**
 * return a function from the router configuration
 * @param  {string} id
 */
function getFunction(id) {
	return registry.getFromRegistry(`${CONST.REGISTRY_HOOK_PREFIX}:${id}`);
}

/**
 * return
 * @param  {[type]} state [description]
 * @param  {[type]} view  [description]
 * @return {[type]}       [description]
 */
function oldConnectView(context, Component, view) {
	return connect(
		state => mapStateToViewProps(state, { view })
	)(Component);
}

export const connectView = deprecated(
	oldConnectView,
	(args) => {
		const cName = args[1].displayName || args[1].name || 'Unknown';
		return `The component ${cName} must be connected using cmfConnect`;
	},
);

/**
 * internal. Is here to replace all 'component' from an object by their
 * value in the registry
 * @param  {object} context
 * @param  {object} item
 */
function loadComponents(context, item) {
	/* eslint no-param-reassign: ["error", { "props": false }] */
	if (item.component) {
		item.component = getComponentFromRegistry(item.component, context);
		if (item.view && !item.component.CMFContainer) {
			item.component = connectView(context, item.component, item.view);
		} else if (item.view && item.component.CMFContainer) {
			const WithView = item.component;
			item.component = props => <WithView view={item.view} {...props} />;
			item.component.displayName = 'WithView';
			item.component.propTypes = {
				view: PropTypes.string,
			};
		}
	}
	if (item.components) {
		// TODO: iterate over all keys to call loadComponents
	}
	if (item.getComponent) {
		item.getComponent = getFunction(item.getComponent);
	}
	if (item.getComponents) {
		item.getComponents = getFunction(item.getComponents);
	}
	if (item.onEnter) {
		item.onEnter = getFunction(item.onEnter);
	}
	if (item.onLeave) {
		item.onEnter = getFunction(item.onEnter);
	}
	if (item.childRoutes) {
		item.childRoutes.forEach(route => loadComponents(context, route));
	}
	if (item.indexRoute) {
		loadComponents(context, item.indexRoute);
	}
}

/**
 * get the react router configuration 'routes' from our settings
 * @param  {object} context
 * @param  {object} settings
 * @return {object} react router config
 */
function getRoutesFromSettings(context, settings) {
	const copy = Object.assign({}, settings);
	loadComponents(context, copy);
	return copy;
}

export default {
	loadComponents,
	getRoutesFromSettings,
	getComponentFromRegistry,
	registerComponent,
	registerFunction,
	getFunction,
};
