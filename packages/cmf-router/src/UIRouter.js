/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { Inject } from '@talend/react-cmf';

function getRouteProps({ path, childRoutes, ...props }, currentpath) {
	// we need Outlet to make it work :(
	const newProps = { ...props };
	let absPath;
	if (path.startsWith('/')) {
		absPath = path;
	} else if (path === '*') {
		absPath = path;
	} else {
		absPath = `${currentpath === '/' ? '' : currentpath}/${path}`;
	}
	if (childRoutes) {
		newProps.children = [<Outlet />];
	}
	// TODO: add index support
	return {
		path,
		key: absPath,
		element: <Inject {...newProps} />,
		children: [(childRoutes || []).map(child => <Route {...getRouteProps(child, path)} />)],
	};
}

export function getRouter(history, basename) {
	/**
	 * pure arrow function that render the router component.
	 * You should never need to use this, it's an internal component
	 * @param  {object} props   The waited props (history and routes)
	 * @return {object} ReactElement
	 */
	function Router(props) {
		// const routes = route.getRoutesFromSettings(context, props.routes, props.dispatch);
		if (props.routes.path && props.routes.component) {
			return (
				<BrowserRouter basename={basename} history={history}>
					<Routes>
						<Route {...getRouteProps(props.routes, props.routes.path)} />
					</Routes>
				</BrowserRouter>
			);
		}
		if (props.loading) {
			return <Inject component={props.loading} />;
		}
		return <div className="is-loading">loading</div>;
	}

	Router.propTypes = {
		dispatch: PropTypes.func,
		routes: PropTypes.object,
		loading: PropTypes.node,
	};
	Router.contextTypes = {
		registry: PropTypes.object,
	};
	Router.displayName = 'CMFReactRouterIntegration';

	const mapStateToProps = state => ({ routes: state.cmf.settings.routes });
	return connect(mapStateToProps)(Router);
}
