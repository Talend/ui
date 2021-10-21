/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Router as BaseRouter } from 'react-router';
import { connect } from 'react-redux';
import { Inject } from '@talend/react-cmf';

import route from './route';

/**
 * @typedef {Object} Router
 */

/**
 * pure arrow function that render the router component.
 * You should never need to use this, it's an internal component
 * @param  {object} props   The waited props (history and routes)
 * @param  {object} context The react context with the registry
 * @return {object} ReactElement
 */
function Router(props, context) {
	const { routes, dispatch, history, ...rest } = props;
	const realRoutes = route.getRoutesFromSettings(context, routes, dispatch);
	if (realRoutes.path === '/' && realRoutes.component) {
		return <BaseRouter routes={realRoutes} history={history} {...rest} />;
	}
	if (props.loading) {
		return <Inject component={props.loading} />;
	}
	return <div className="is-loading">loading</div>;
}

Router.propTypes = {
	dispatch: PropTypes.func,
	history: PropTypes.object,
	routes: PropTypes.object,
	loading: PropTypes.node,
};
Router.contextTypes = {
	registry: PropTypes.object,
};
Router.displayName = 'Router';

const mapStateToProps = state => ({ routes: state.cmf.settings.routes });
export default connect(mapStateToProps)(Router);
