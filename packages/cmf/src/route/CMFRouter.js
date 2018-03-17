/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import CMFRoute from './CMFRoute';

/**
 * @typedef {Object} Router
 */

/**
 * Pure arrow function that render the router component.
 * You should never need to use this, it's an internal component
 * @example
 "routes": {
    "path": "/",
    "component": "App",
    "indexRoute": {
      "component": "Redirect",
      "view": "redirectToStream"
    },
    "childRoutes": [
      {
        "path": "home",
        "component": "HomeListView",
        "view": "homepage"
        "childRoutes": [
          {
            "path": "sub",
            "component": "SubHome"
            "view": "subhome"
          }
        ]
      }
    ]
  }
 * @param  {object} props The props (history and routes)
 * @return {object} ReactElement
 */
export function CMFRouterComponent(props) {
	const routes = props.routes;
	if (routes.path === '/' && routes.component) {
		return (
			<ConnectedRouter history={props.history}>
				<CMFRoute {...routes} />
			</ConnectedRouter>
		);
	}
	return <div className="is-loading">loading</div>;
}
CMFRouterComponent.displayName = 'CMFRouter';
CMFRouterComponent.propTypes = {
	history: PropTypes.object,
	routes: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		routes: state.cmf.settings.routes,
	};
}

export default connect(mapStateToProps)(CMFRouterComponent);
