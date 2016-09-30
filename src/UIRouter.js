/**
 * @module react-cmf/lib/UIRouter
 */
import React from 'react';
import { Router as BaseRouter } from 'react-router';
import { connect } from 'react-redux';

import api from './api';

/**
 * pure arrow function that render the router component.
 * You should never need to use this, it's an internal component
 * @param  {object} props   The waited props (history and routes)
 * @param  {object} context The react context with the registry
 * @return {object} ReactElement
 */
const UIRouter = (props, context) => {
	const routes = api.route.getRoutesFromSettings(context, props.routes);
	if (routes.path === '/' && !!routes.component) {
		return (<BaseRouter routes={routes} history={props.history} />);
	}
	return (
		<div className="is-loading">loading</div>
	);
};

UIRouter.propTypes = {
	history: React.PropTypes.object,
	routes: React.PropTypes.object,
};
UIRouter.contextTypes = {
	registry: React.PropTypes.object,
};
const mapStateToProps = (state) => ({ routes: state.cmf.settings.routes });
export default connect(
	mapStateToProps
)(UIRouter);
