/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { Inject } from '@talend/react-cmf';

function getRouteProps({ path, childRoutes, ...props }, currentpath) {
	const newProps = { ...props };
	let absPath;
	if (path.startsWith('/')) {
		absPath = path;
	} else if (path === '*') {
		absPath = path;
	} else {
		absPath = `${currentpath === '/' ? '' : currentpath}/${path}`;
	}
	// if (childRoutes) {
	// 	newProps.children = [childRoutes.map(child => <Route {...getRouteProps(child, absPath)} />)];
	// }
	console.log('@@@', absPath, newProps);
	return {
		path: absPath,
		key: absPath,
		element: <Inject {...newProps} />,
		children: [(childRoutes || []).map(child => <Route {...getRouteProps(child, absPath)} />)],
	};
}

/**
 * pure arrow function that render the router component.
 * You should never need to use this, it's an internal component
 * @param  {object} props   The waited props (history and routes)
 * @param  {object} context The react context with the registry
 * @return {object} ReactElement
 */
function Router(props) {
	// const routes = route.getRoutesFromSettings(context, props.routes, props.dispatch);
	console.log('###', props);
	const basename = '/playground';
	if (props.routes.path && props.routes.component) {
		return (
			<BrowserRouter basename={basename}>
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
Router.displayName = 'UIRouter';

const mapStateToProps = state => ({ routes: state.cmf.settings.routes });
export default connect(mapStateToProps)(Router);
