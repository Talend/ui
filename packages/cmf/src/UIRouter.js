/**
 * @module react-cmf/lib/UIRouter
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import api from './api';

function getComponent(view, componentName, context) {
	const component = api.route.getComponentFromRegistry(context, componentName);
	if (view && !component.CMFContainer) {
		return api.route.connectView(context, component, view);
	}
	return component;
}

function CMFRoute(props, context) {
	const { path, view, childRoutes, component } = props;
	const Component = getComponent(view, component, context);

	let safePath = path;
	if (!safePath.startsWith('/')) {
		safePath = `${props.cmfParentPath || ''}/${path}`;
	}
	// Warning: You should not use <Route component> and <Route children>
	// in the same route; <Route children> will be ignored
	function SubComponent(subprops) {
		return (
			<Component view={view} {...subprops}>
				{childRoutes ? childRoutes.map((route, index) => (
					<CMFRoute key={index} {...route} cmfParentPath={safePath} />
				)) : null}
			</Component>
		);
	}
	return (
		<Route
			path={safePath}
			exact
			component={SubComponent}
		/>
	);
}

CMFRoute.propTypes = {
	cmfParentPath: PropTypes.string,
	path: PropTypes.string,
	component: PropTypes.string,
	view: PropTypes.string,
	childRoutes: PropTypes.arrayOf(PropTypes.object),  // recursive
};
CMFRoute.contextTypes = {
	registry: PropTypes.object,
	router: PropTypes.object,
};
CMFRoute.displayName = 'CMFRoute';

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
	if (routes.path === '/' && !!routes.component) {
		const Component = getComponent(routes.view, routes.component, context);
		const IndexComponent = getComponent(
			routes.indexRoute.view,
			routes.indexRoute.component,
			context
		);
		return (
			<ConnectedRouter history={props.history}>
				<Component view={routes.view}>
					<Route exact path="/" component={IndexComponent} />
					{routes.childRoutes ? routes.childRoutes.map((route, index) => (
						<CMFRoute key={index} {...route} />
					)) : null}
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
	history: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
	routes: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
	return {
		routes: state.cmf.settings.routes,
		router: state.router,  // force re render on router change
	};
}

export default connect(mapStateToProps)(CMFRouter);
