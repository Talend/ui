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
 * This is to render an not found component to alert developers
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
Inject.map = function injectMap(getComponent, array, CustomInject = Inject) {
	return array.map((props, index) => (
		<CustomInject key={index} getComponent={getComponent} {...props} />
	));
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
Inject.all = function injectAll(getComponent, components, CustomInject = Inject) {
	if (!getComponent || !components) {
		return nothing;
	}
	return (key, props) => {
		if (Array.isArray(components[key])) {
			return Inject.map(getComponent, components[key], CustomInject);
		} else if (typeof components[key] === 'object') {
			return <CustomInject getComponent={getComponent} {...props} {...components[key]} />;
		}
		return null;
	};
};

/**
 * used to inject a component with componentID & fallback on a component given if not available
 * @param {function} getComponent the method used to resolve the component
 * @param {string} componentId the id to fetch with getComponent method
 * @param {object} DefaultComponent The component to fallback to
 */
Inject.get = function injectGet(getComponent, componentId, DefaultComponent) {
	if (!getComponent || componentId == null) {
		return DefaultComponent;
	}
	try {
		return getComponent(componentId);
	} catch (error) {
		return DefaultComponent;
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

/**
 * Allow a props to have multiple shape with a target to be a react valid element.
 * It supports three shapes: string, object, react element
 * @param {function} getComponent
 * @param {object|string|React Element} data
 */
Inject.getReactElement = function getReactElement(getComponent, data, CustomInject = Inject) {
	if (Array.isArray(data)) {
		return data.map(info => getReactElement(getComponent, info, CustomInject));
	} else if (data === null) {
		return data;
	} else if (typeof data === 'string') {
		return <CustomInject getComponent={getComponent} component={data} />;
	} else if (React.isValidElement(data)) {
		return data;
	} else if (typeof data === 'object') {
		return <CustomInject getComponent={getComponent} {...data} />;
	}
	return data;  // We do not throw anything, proptypes should do the job
};

Inject.getReactElement.propTypes = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.shape({ component: PropTypes.string }),
	PropTypes.element,
	PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.shape({ component: PropTypes.string }),
			PropTypes.element,
		]),
	),
]);

Inject.displayName = 'Inject';

export { Inject as default, NotFoundComponent };
