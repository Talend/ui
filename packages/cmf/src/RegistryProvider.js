/**
 * Internal. This is the component which inject the registry as child context.
 * It is called by the App component
 * @module react-cmf/lib/RegistryProvider
 * @see module:react-cmf/lib/App
 */
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import Registry from './registry';

/**
 * The provider is a JSX wrapper to inject the registry as a context var
 * You should never need to use this, it's an internal component
 */
export default class RegistryProvider extends React.Component {
	constructor(props) {
		super(props);
		this.registry = Registry.getRegistry();
	}

	/**
	 * @return {object} child with registry as only key
	 */
	getChildContext() {
		return { registry: this.registry };
	}

	/**
	 * react rendering
	 * @return {object} ReactElement
	 */
	render() {
		return Children.only(this.props.children);
	}
}

RegistryProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
RegistryProvider.childContextTypes = {
	registry: PropTypes.object,
};
