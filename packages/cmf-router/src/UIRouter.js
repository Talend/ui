/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Inject } from '@talend/react-cmf';

import route from './route';

/**
 * @typedef {Object} Router
 */

function renderRoutes({ path, childRoutes, ...props }) {
	const newProps = { ...props };
	if (childRoutes) {
		newProps.children = childRoutes.map(child => (
			<Route path={child.path}>
				<Inject {...getInjectProps(child)} />
			</Route>
		));
	}
	return (
		<Route path={path}>
			<Inject {...newProps} />
		</Route>
	);
}

/**
 * pure arrow function that render the router component.
 * You should never need to use this, it's an internal component
 * @param  {object} props   The waited props (history and routes)
 * @param  {object} context The react context with the registry
 * @return {object} ReactElement
 */
function Router(props, context) {
	const routes = route.getRoutesFromSettings(context, props.routes, props.dispatch);
	if (routes.path === '/' && routes.component) {
		return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
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
Router.displayName = 'Router';

const mapStateToProps = state => ({ routes: state.cmf.settings.routes });
export default connect(mapStateToProps)(Router);
