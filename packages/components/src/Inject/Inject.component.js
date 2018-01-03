import React from 'react';
import PropTypes from 'prop-types';

function NotFoundComponent({ error }) {
	return <div className="alert alert-danger">{error}</div>;
}

NotFoundComponent.propTypes = {
	error: PropTypes.string.isRequired,
};

function Inject({ getComponent, component, ...props }) {
	if (!getComponent || !component) {
		return null;
	}
	try {
		const Component = getComponent(component);
		return <Component {...props} />;
	} catch (error) {
		return <NotFoundComponent error={error.message} />;
	}
}

Inject.propTypes = {
	getComponent: PropTypes.func,
	component: PropTypes.string,
};

Inject.map = function injectMap(getComponent, array) {
	return array.map(props => <Inject getComponent={getComponent} {...props} />);
};

export { Inject as default, NotFoundComponent };
