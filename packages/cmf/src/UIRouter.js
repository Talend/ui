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
import omit from 'lodash/omit';
import api from './api';

const contextTypes = {
	registry: PropTypes.object,
	router: PropTypes.object,
};

function withViewHOC(Component, view) {
	function WithView(props) {
		return <Component view={view} {...props} />;
	}
	WithView.displayName = `WithView(${Component.displayName})`;
	return WithView;
}

function getComponent(view, componentName, context) {
	const component = api.component.get(componentName, context);
	if (view && !component.CMFContainer) {
		return api.route.connectView(context, component, view);
	} else if (view) {
		return withViewHOC(component, view);
	}
	return component;
}

class CMFRouteHooks extends React.Component {
	static displayName = 'CMFRouteHooks';
	static propTypes = {
		onEnter: PropTypes.string,
		onLeave: PropTypes.string,
		children: PropTypes.element,
		dispatch: PropTypes.func,
	};
	static contextTypes = contextTypes;

	constructor(props, context) {
		super(props, context);
		this.onEnter = this.props.onEnter && api.route.getFunction(this.props.onEnter, this.context);
		this.onLeave = this.props.onLeave && api.route.getFunction(this.props.onLeave, this.context);
	}

	componentWillMount() {
		if (!this.onEnter) {
			return;
		}
		this.onEnter({
			router: omit(this.props, ['onEnter', 'onLeave', 'children']),
			dispatch: this.props.dispatch,
		});
	}

	componentWillUnmount() {
		if (!this.onLeave) {
			return;
		}
		this.onLeave({
			router: omit(this.props, ['onEnter', 'onLeave', 'children']),
			dispatch: this.props.dispatch,
		});
	}

	render() {
		return React.Children.only(this.props.children);
	}
}
const ConnectedCMFRouteHooks = connect()(CMFRouteHooks);

function CMFRoute(props, context) {
	const { path, view, childRoutes, component, onEnter, onLeave } = props;
	const Component = getComponent(view, component, context);

	let safePath = path;
	if (!safePath.startsWith('/')) {
		safePath = `${props.cmfParentPath || ''}/${path}`;
	}

	// Warning: You should not use <Route component> and <Route children>
	// in the same route; <Route children> will be ignored
	function SubComponent(subprops) {
		const componentWithChildrenRoutes = (
			// Backward compat: add props.params
			<Component view={view} {...subprops} params={subprops.match.params}>
				{childRoutes ? childRoutes.map((route, index) => (
					<CMFRoute key={index} {...route} cmfParentPath={safePath} />
				)) : null}
			</Component>
		);

		if (onEnter || onLeave) {
			return (
				<ConnectedCMFRouteHooks {...subprops} onEnter={onEnter} onLeave={onLeave}>
					{componentWithChildrenRoutes}
				</ConnectedCMFRouteHooks>
			);
		}

		return componentWithChildrenRoutes;
	}

	return (
		<Route
			path={safePath}
			exact={props.exact}
			component={SubComponent}
		/>
	);
}

CMFRoute.propTypes = {
	exact: PropTypes.bool,
	cmfParentPath: PropTypes.string,
	path: PropTypes.string,
	component: PropTypes.string,
	view: PropTypes.string,
	childRoutes: PropTypes.arrayOf(PropTypes.object),  // recursive
	onEnter: PropTypes.string,
	onLeave: PropTypes.string,
};
CMFRoute.contextTypes = contextTypes;
CMFRoute.displayName = 'CMFRoute';

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
CMFRouter.contextTypes = contextTypes;
CMFRouter.propTypes = {
	history: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
	routes: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
	return {
		routes: state.cmf.settings.routes,
	};
}

export default connect(mapStateToProps)(CMFRouter);
