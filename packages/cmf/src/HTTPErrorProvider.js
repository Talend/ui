/**
 * @module react-cmf/lib/HTTPErrorProvider
 * @see module:react-cmf/lib/App
 */
import PropTypes from 'prop-types';
import React, { Children } from 'react';

let error401;
let error403;
let error404;

export function getHandleErrors() {
	return {
		error401,
		error403,
		error404,
	};
}

/**
 * The provider is a JSX wrapper to inject the registry as a context var
 * You should never need to use this, it's an internal component
 */
export default function HTTPErrorProvider(props) {
	error401 = props.error401;
	error403 = props.error403;
	error404 = props.error404;

	return Children.only(this.props.children);
}

// saga

HTTPErrorProvider.propTypes = {
	on401: PropTypes.func,
	on403: PropTypes.func,
	on404: PropTypes.func,
	children: PropTypes.element.isRequired,
};
