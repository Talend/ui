import PropTypes from 'prop-types';
import React from 'react';
import api from './api';

const getComponentFrom = api.route.getComponentFromRegistry;

function NotFoundComponent({ error }) {
	console.error(error.message);
	return (<div className="alert alert-danger">{error.message}</div>);
}
NotFoundComponent.propTypes = {
	error: PropTypes.string.isRequired,
};

function Inject({ component, ...props }, context) {
	try {
		const Component = getComponentFrom(context, component);
		return (<Component {...props} />);
	} catch (error) {
		return (<NotFoundComponent error={error.message} />);
	}
}
Inject.contextTypes = {
	registry: PropTypes.object.isRequired,
};
Inject.propTypes = {
	component: PropTypes.string.isRequired,
};
Inject.NotFoundComponent = NotFoundComponent;

export default Inject;
