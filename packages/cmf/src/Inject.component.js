import PropTypes from 'prop-types';
import React from 'react';
import api from './api';

/**
 * The Inject component let you use the registry to render named component
 * using the registry. It will not break the app if component is not found
 * but it will display an error.
 * @module react-cmf/lib/Inject
 * @example
import { Inject } from '@talend/react-cmf';
// this is not the best example but it show the concept
function MyComponent(props) {
	return (
		<Inject component="Action" onClick={props.onClick}>
			<Inject component="Icon" icon={props.icon} />
		</Inject>
	);
}
 */

function NotFoundComponent({ error }) {
	console.error(error.message);
	return (<div className="alert alert-danger">{error.message}</div>);
}
NotFoundComponent.propTypes = {
	error: PropTypes.string.isRequired,
};
NotFoundComponent.displayName = 'InjectNotFound';

function Inject({ component, ...props }, context) {
	try {
		const Component = api.component.get(component, context);
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
Inject.displayName = 'Inject';
Inject.NotFoundComponent = NotFoundComponent;

export default Inject;
