import React, { PropTypes } from 'react';
import api from './api';

const getComponentFrom = api.route.getComponentFromRegistry;

function NotFoundComponent({ children, error, ...props }) {
	console.error(e);
	return (
		<div {...props}>
			<div className="alert alert-danger">{error.message}</div>
			{children}
		</div>
	);
}

function Inject({ component, ...props }, context) {
	try {
		const Component = getComponentFrom(context, component);
		return (
			<Component {...props} />
		);
	} catch(error) {
		return <NotFoundComponent error={error.message} {...props} />
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
