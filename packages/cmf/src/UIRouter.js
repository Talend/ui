/**
 * @module react-cmf/lib/UIRouter
 */
import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import api from './api';

function CMFRoute(props, context) {
	let Component = api.route.getComponentFromRegistry(context, props.component);
	if (props.view && !Component.CMFContainer) {
		Component = api.route.connectView(context, Component, props.view);
	}
	if (props.path === '/') {
		let IndexComponent = api.route.getComponentFromRegistry(context, props.indexRoute);
		if (props.indexRoute.view) {
			IndexComponent = api.route.connectView(context, IndexComponent, props.indexRoute.view);
		}
		return (
			<Component view={props.view}>
				<Route exact path="/" component={IndexComponent} />
				{props.childRoutes ? props.childRoutes.map((route, index) => (
					<CMFRoute key={index} {...route} />
				)) : null}
			</Component>
		);
	}
	// Warning: You should not use <Route component> and <Route children>
	// in the same route; <Route children> will be ignored
	function SubComponent(subprops) {
		return (
			<Component {...subprops}>
				{props.childRoutes ? props.childRoutes.map((route, index) => (
					<CMFRoute key={index} {...route} />
				)) : null}
			</Component>
		);
	}
	return (
		<Route
			path={props.path}
			exact
			component={SubComponent}
		/>
	);
}

CMFRoute.propTypes = {
	path: PropTypes.string,
	component: PropTypes.string,
	view: PropTypes.string,
	childRoutes: PropTypes.arrayOf(PropTypes.object),  // recursive
	indexRoute: PropTypes.shape({
		component: PropTypes.string,
		view: PropTypes.string,
	}),
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
 * @param  {object} context The react context with the registry
 * @return {object} ReactElement
 */
function CMFRouter(props) {
	const routes = props.routes;
	const history = props.history || createHashHistory();
	if (routes.path === '/' && !!routes.component) {
		return (
			<ConnectedRouter history={history}>
				<CMFRoute
					match="/"
					component={routes.component}
					view={routes.view}
					indexRoute={routes.indexRoute}
					childRoutes={routes.childRoutes}
				/>
			</ConnectedRouter>
		);
	}
	return (
		<div className="is-loading">loading</div>
	);
}
CMFRouter.displayName = 'CMFRouter';

CMFRouter.propTypes = {
	history: React.PropTypes.object,
	routes: React.PropTypes.object,
};
const mapStateToProps = (state) => ({ routes: state.cmf.settings.routes });
export default connect(
	mapStateToProps
)(CMFRouter);
