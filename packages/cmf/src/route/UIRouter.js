/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import CMFRoute, { getComponent } from './CMFRoute';

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
 * * @param  {object} context The react context with the registry
 * @return {object} ReactElement
 */
function CMFRouter(props, context) {
	const routes = props.routes;
	if (routes.path === '/' && routes.component) {
		const Component = getComponent(routes.view, routes.component, context);

		let IndexComponent;
		if (routes.indexRoute) {
			IndexComponent = getComponent(
				routes.indexRoute.view,
				routes.indexRoute.component,
				context
			);
		}

		return (
			<ConnectedRouter history={props.history}>
				<Component view={routes.view}>
					{IndexComponent && <Route exact path={routes.path} component={IndexComponent} />}
					{
						routes.childRoutes &&
						routes.childRoutes.map((route, index) => (
							<CMFRoute key={index} {...route} />
						))
					}
				</Component>
			</ConnectedRouter>
		);
	}
	return (
		<div className="is-loading">loading</div>
	);
}
CMFRouter.displayName = 'CMFRouter';
CMFRouter.contextTypes = {
	registry: PropTypes.object,
	router: PropTypes.object,
};
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
