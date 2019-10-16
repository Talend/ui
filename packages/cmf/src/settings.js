/**
 * Internal. All stuff related to the settings handling in CMF.
 * @module react-cmf/lib/settings
 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import memoize from 'lodash/memoize';

/**
 * if viewId is undefined, try to generate a meaningfull one
 * else return given viewId
 * @param {string} viewId
 * @param {strign} componentName
 * @param {string} componentId
 */
export function generateDefaultViewId(viewId, componentName, componentId) {
	if (!viewId) {
		if (componentName && componentId) {
			return `${componentName}#${componentId}`;
		} else if (componentName) {
			return componentName;
		}
	}
	return viewId;
}

/**
 * Extract component name without HOC
 * @param {String} viewId Connect(CMF(Container(MyComponent)))
 * @return {String} MyComponent
 */
function withoutHOC(componentName) {
	return componentName.match(/.*\((.*?)\)/)[1];
}

/**
 * try to retrieve view settings for a cmfconnected component
 * @param {Object} state the application state
 * @param {*} ownProps props given to the cmfConnected component
 * @param {*} componentName name of the cmfConnect component
 * @param {*} componentId componentId, can be undefined
 */
export function nonMemoized(state, ownProps, componentName, componentId) {
	let viewProps;
	let viewId = ownProps.view;

	viewId = generateDefaultViewId(viewId, componentName, componentId);

	if (viewId && state.cmf.settings.props[viewId]) {
		viewProps = state.cmf.settings.props[viewId] || {};
	} else if (componentName && componentName.includes('(')) {
		viewId = generateDefaultViewId(null, withoutHOC(componentName), componentId);
		if (viewId && state.cmf.settings.props[viewId]) {
			viewProps = state.cmf.settings.props[viewId] || {};
		}
	}
	return viewProps;
}

/**
 * return props for a given view with reference and override support
 * this function is memoized and the map key is computed using
 * `${ownProps.view}-${componentName}-${componentId}`
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
export const mapStateToViewProps = memoize(
	nonMemoized,
	(state, ownProps, componentName, componentId) =>
		`${ownProps.view}-${componentName}-${componentId}-${state.cmf.settings.initialized}`,
);

function PureWaitForSettings(props) {
	if (!props.initialized) {
		return <props.loading />;
	}
	return props.children;
}
PureWaitForSettings.propTypes = {
	initialized: PropTypes.bool,
	children: PropTypes.node,
};
PureWaitForSettings.defaultProps = {
	loading: () => 'loading',
};

export const WaitForSettings = connect(state => ({
	initialized: state.cmf.settings.initialized,
}))(PureWaitForSettings);

export default {
	mapStateToViewProps,
};
