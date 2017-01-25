/**
 * All stuff related to the routing in CMF
 * @module react-cmf/lib/route
 */

/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }]*/
import invariant from 'invariant';

import { connect } from 'react-redux';
import registry from './registry';

const COMPONENT_PREFIX = '_.route.component';
const HOOK_PREFIX = '_.route.hook';

/**
 * return a component from the registry
 * @param  {object} context
 * @param  {string} id
 * @return {function} the react component
 */
function getComponentFromRegistry(context, id) {
	const component = context.registry[`${COMPONENT_PREFIX}:${id}`];
	if (!component) {
		throw new Error(`component not found in the registry: ${id}`);
	}
	return component;
}


/**
 * register a component for the router configuration
 * @param  {string} id
 * @param  {any} component
 */
function registerComponent(id, component) {
	registry.addToRegistry(`${COMPONENT_PREFIX}:${id}`, component);
}

/**
 * register a function for the router configuration
 * @param  {string} id
 * @param  {function} func
 */
function registerFunction(id, func) {
	if ((typeof func) !== 'function') {
		throw new Error('registerFunction wait for a function');
	}
	registry.addToRegistry(`${HOOK_PREFIX}:${id}`, func);
}

/**
 * return a function from the router configuration
 * @param  {string} id
 */
function getFunction(id) {
	return registry.getFromRegistry(`${HOOK_PREFIX}:${id}`);
}

export function attachRef(state, obj) {
	let props = obj;
	if (props._ref) {
		const ref = state.cmf.settings.ref[props._ref];
		invariant(ref, `CMF/Settings: Reference '${props._ref}' not found`);
		props = Object.assign(
			{},
			state.cmf.settings.ref[props._ref],
			obj
		);
		delete props._ref;
	}
	return props;
}

/**
 * return props for a given view with reference and override support
 *
 * @example

// state.cmf.settings should look like this

  "views":{
	"homepage": {
	  "sidemenu": {
		"_ref": "SidePanel#default"
	  },
	  "listview": {
		"_ref": "List#default",
		"collectionId": "streams"
	  }
	}
  },
  "ref": {
	 "SidePanel#default": {
	   "actions": ["menu:1", "menu:2", ...]
	 }
  }

//in that case you will have the following props for the homepage view

  {
	sidemenu: {
	  "actions": ["menu:1", "menu:2", ...]
	},
	listview: {
	  ...
	}
  }

 *
 * @param  {Object} state     redux state
 * @param  {Object} context   React context with store. It's optional
 * @param  {function} component React component
 * @param  {String} view      id of the view
 * @return {Object}           React props for the component
 */
export function mapStateToViewProps(state, context, view) {
	const settings = state.cmf.settings;
	let props = Object.assign(
		{},
		settings.views[view],
	);
	if (context && context.store) {
		props.dispatch = context.store.dispatch;
	}
	props = attachRef(state, props);
	Object.keys(props).forEach(
		key => {
			props[key] = attachRef(state, props[key]);
		}
	);
	return props;
}

/**
 * return
 * @param  {[type]} state [description]
 * @param  {[type]} view  [description]
 * @return {[type]}       [description]
 */
export function connectView(context, component, view) {
	return connect(
		(state) => mapStateToViewProps(state, context, view)
	)(component);
}

/**
 * internal. Is here to replace all 'component' from an object by their
 * value in the registry
 * @param  {object} context
 * @param  {object} item
 */
function loadComponents(context, item) {
	/* eslint no-param-reassign: ["error", { "props": false }] */
	if (item.component) {
		item.component = getComponentFromRegistry(context, item.component);
		if (item.view) {
			item.component = connectView(context, item.component, item.view);
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
		item.childRoutes.forEach((route) => loadComponents(context, route));
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
