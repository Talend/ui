import React from 'react';
import PropTypes from 'prop-types';

function nothing() {
	return null;
}

function Inject({ getComponent, component, ...props }) {
	if (!getComponent || !component) {
		return null;
	}
	const Component = getComponent(component);
	return <Component {...props} />;
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
		return { get: nothing };
	}
	const injected = {};
	Object.keys(components).forEach(key => {
		injected[key] = <Inject getComponent={getComponent} {...components[key]} />;
	});
	return { get: comp => injected[comp] || null };
};

export default Inject;
