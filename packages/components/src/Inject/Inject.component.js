import React from 'react';
import PropTypes from 'prop-types';

function nothing() {
	return null;
}

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

Inject.all = function injectAll(getComponent, components) {
	if (!getComponent || !components) {
		return nothing;
	}
	return key => {
		if (Array.isArray(components[key])) {
			return components[key].map(props => <Inject getComponent={getComponent} {...props} />);
		} else if (typeof components[key] === 'object') {
			return <Inject getComponent={getComponent} {...components[key]} />;
		}
		return null;
	};
};

Inject.get = function injectGet(getComponent, componentId, Component) {
	if (!getComponent) {
		return Component;
	}
	try {
		return getComponent(componentId);
	} catch (error) {
		return Component;
	}
};

Inject.getAll = function injectGetAll(getComponent, config) {
	const components = {};
	Object.keys(config).forEach(key => {
		components[key] = Inject.get(getComponent, key, config[key]);
	});
	return components;
};

export { Inject as default, NotFoundComponent };
