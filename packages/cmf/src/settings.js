/**
 * All stuff related to the routing in CMF
 * @module react-cmf/lib/route
 */

/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }]*/
import invariant from 'invariant';

/**
 * if an object try to find _ref property and resolve it
 */
export function attachRef(state, obj) {
	if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
		return obj;
	}
	let props = Object.assign({}, obj);
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

export function attachRefs(state, props) {
	const attachedProps = attachRef(state, props);
	Object.keys(attachedProps).forEach(
		(key) => {
			attachedProps[key] = attachRef(state, attachedProps[key]);
		}
	);
	return attachedProps;
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
 * @param  {Object} ownProps   the props passed to the component. may have a view attribute
 * @return {Object}           React props for the component injected from the settings
 */
export function mapStateToViewProps(state, ownProps, componentName, componentId) {
	let viewProps = {};
	let viewId = ownProps.view;
	if (!ownProps.view && componentName && !componentId) {
		viewId = componentName;
	} else if (!ownProps.view && componentName && componentId) {
		viewId = `${componentName}:${componentId}`;
	}
	if (viewId && state.cmf.settings.views[viewId]) {
		viewProps = Object.assign(
			{},
			state.cmf.settings.views[viewId],
		);
		viewProps = attachRefs(state, viewProps);
	}
	return viewProps;
}

export default {
	attachRef,
	attachRefs,
	mapStateToViewProps,
};
