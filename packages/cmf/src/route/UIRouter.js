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
 * pure arrow function that render the router component.
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
 * @param  {object} props   The waited props (history and routes)
 * @return {object} ReactElement
 */
function CMFRouter(props) {
	const routes = props.routes;
	if (routes.path === '/' && routes.component) {
		return (
			<ConnectedRouter history={props.history}>
				<CMFRoute {...routes} />
			</ConnectedRouter>
		);
	}
	return (
		<div className="is-loading">loading</div>
	);
}
CMFRouter.displayName = 'CMFRouter';
CMFRouter.propTypes = {
	history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	routes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
	return {
		routes: state.cmf.settings.routes,
	};
}

export default connect(mapStateToProps)(CMFRouter);
