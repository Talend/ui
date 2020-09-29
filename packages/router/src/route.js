/**
 * Internal. Provide low level function to configure CMF to drive react-router.
 * @module react-cmf/lib/route
 */

/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }] */

import PropTypes from 'prop-types';

import React from 'react';
import cmf, { cmfConnect } from '@talend/react-cmf';

export const REGISTRY_HOOK_PREFIX = '_.route.hook';

/**
 * register a function for the router configuration
 * @param  {string} id
 * @param  {function} func
 */
function registerFunction(id, func) {
	if (typeof func !== 'function') {
		throw new Error('registerFunction wait for a function');
	}
	cmf.registry.addToRegistry(`${REGISTRY_HOOK_PREFIX}:${id}`, func);
}

/**
 * return a function from the router configuration
 * @param  {string} id
 * @param  {object} contextcmf context
 */
function getFunction(id, context) {
	return cmf.registry.getFromRegistry(`${REGISTRY_HOOK_PREFIX}:${id}`, context);
}

function withProps(Component, item) {
	if (item.view) {
		// eslint-disable-next-line no-console
		console.warn('DEPRECATED: view is deprecated please use componentId');
	}
	let CMFComponent = Component;
	if (!Component.CMFContainer) {
		CMFComponent = cmfConnect({})(Component);
	}
	const WithProps = props => (
		<CMFComponent view={item.view} componentId={item.componentId} {...props} />
	);
	WithProps.displayName = 'WithProps';
	WithProps.WrappedComponent = CMFComponent;
	WithProps.propTypes = {
		view: PropTypes.string,
		componentId: PropTypes.string,
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
		item.component = withProps(cmf.component.get(item.component, context), item);
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
		const onEnterFn = getFunction(item.onEnter, context);
		item.onEnter = function onEnter(nextState, replace) {
			return onEnterFn({
				router: {
					nextState,
					replace,
				},
				dispatch,
			});
		};
	}
	if (item.onLeave) {
		const onLeaveFn = getFunction(item.onLeave, context);
		item.onLeave = function onLeave(nextState, replace) {
			return onLeaveFn({
				router: {
					nextState,
					replace,
				},
				dispatch,
			});
		};
	}
	if (item.childRoutes) {
		item.childRoutes.forEach(route => loadComponents(context, route, dispatch));
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
	const copy = { ...settings };
	loadComponents(context, copy, dispatch);
	return copy;
}

export default {
	loadComponents,
	getRoutesFromSettings,
	registerFunction,
	getFunction,
};
