/**
 * Internal. All stuff related to the settings handling in CMF.
 * @module react-cmf/lib/settings
 */

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
		viewId = `${componentName}#${componentId}`;
	}
	if (viewId && state.cmf.settings.views[viewId]) {
		viewProps = state.cmf.settings.views[viewId] || {};
	}
	return viewProps;
}

export default {
	mapStateToViewProps,
};
