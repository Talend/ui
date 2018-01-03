import React from 'react';
import PropTypes from 'prop-types';

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

export default Inject;
