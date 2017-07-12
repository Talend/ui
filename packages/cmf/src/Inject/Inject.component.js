import React, { PropTypes } from 'react';
import api from '../api';

const getComponentFrom = api.route.getComponentFromRegistry;

function Inject({ component, ...props }, context) {
	const Component = getComponentFrom(context, component);
	return (
		<Component {...props} />
	);
}
Inject.contextTypes = {
	registry: PropTypes.object.isRequired,
};
Inject.propTypes = {
	component: PropTypes.string.isRequired,
};

export default Inject;
