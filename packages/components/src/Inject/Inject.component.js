import React from 'react';
import PropTypes from 'prop-types';

/**
 * This function is just here to handle the
 * case of null parameter in components
 */
function nothing() {
	return null;
}

/**
 * T>his is to render an not found componenent to alert developers
 * @param {object} props container of the error
 */
function NotFoundComponent({ error }) {
	return <div className="alert alert-danger">{error}</div>;
}

NotFoundComponent.propTypes = {
	error: PropTypes.string.isRequired,
};

/**
 * This component role is to show the evaluated component or not found component
 * @param {object} props getComponent method to resolve the component given and his props
 */
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

/**
 * This function is used to inject an array of components
 * @param {function} getComponent the method used to resolve the component
 * @param {array} array an array of components
 */
Inject.map = function injectMap(getComponent, array) {
	return array.map(props => <Inject getComponent={getComponent} {...props} />);
};

/**
 * Used to inject components & have them in an object to resolve it in our component
 * @param {function} getComponent the method used to resolve the component
 * @param {object} components an object to represent the components
 * @example
	{
		'header': [{ component: 'MyConnectedHeader', myProps: 'lol' }],
		'aside': [{ component: 'MyConnectedSidePanel', toto: 'mdr' }],
	}
 */
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

/**
 * used to inject a component with componentID & fallback on a component given if not available
 * @param {function} getComponent the method used to resolve the component
 * @param {string} componentId the id to fetch with getComponent method
 * @param {object} Component The component to fallback to
 */
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

/**
 * Allow to call get on a object configuration
 * @param {function} getComponent the method used to resolve the component
 * @param {object} config the component configurations
 */
Inject.getAll = function injectGetAll(getComponent, config) {
	const components = {};
	Object.keys(config).forEach(key => {
		components[key] = Inject.get(getComponent, key, config[key]);
	});
	return components;
};

export { Inject as default, NotFoundComponent };
