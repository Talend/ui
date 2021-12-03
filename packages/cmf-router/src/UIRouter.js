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

/**
 * @typedef {Object} Router
 */

function renderRoutes({ path, childRoutes, ...props }, currentpath) {
	const newProps = { ...props };
	const absPath = path.startsWith('/') ? path : `${currentpath}/${path}`;
	if (childRoutes) {
		newProps.children = childRoutes.map(child => renderRoutes(child, absPath));
	}
	console.log('####', absPath, props.component, newProps);
	return (
		<Route path={absPath} key={absPath}>
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
function Router(props) {
	// const routes = route.getRoutesFromSettings(context, props.routes, props.dispatch);
	if (props.routes.path && props.routes.component) {
		return <BrowserRouter>{renderRoutes(props.routes, props.routes.path)}</BrowserRouter>;
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
