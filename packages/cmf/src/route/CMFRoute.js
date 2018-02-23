import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import CMFRouteHook from './CMFRouteHook';
import api from '../api';

function withViewHOC(Component, view) {
	function WithView(props) {
		return <Component view={view} {...props} />;
	}
	WithView.displayName = `WithView(${Component.displayName})`;
	return WithView;
}

export function getComponent(view, componentName, context) {
	const component = api.component.get(componentName, context);
	if (view && !component.CMFContainer) {
		return api.route.connectView(context, component, view);
	} else if (view) {
		return withViewHOC(component, view);
	}
	return component;
}

export default function CMFRoute(props, context) {
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
				<CMFRouteHook {...subprops} onEnter={onEnter} onLeave={onLeave}>
					{componentWithChildrenRoutes}
				</CMFRouteHook>
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
CMFRoute.contextTypes = {
	registry: PropTypes.object,
	router: PropTypes.object,
};
CMFRoute.displayName = 'CMFRoute';
