/**
 * @module react-cmf/lib/RegistryProvider
 */
import React from 'react';
import Registry from './registry';

/**
 * The provider is a JSX wrapper to inject the registry as a context var
 * You should never need to use this, it's an internal component
 */
export default class RegistryProvider extends React.Component {

	/**
	 * @return {object} child with registry as only key
	 */
	getChildContext() {
		return { registry: Registry.getRegistry() };
	}

	/**
	 * react rendering
	 * @return {object} ReactElement
	 */
	render() {
		// FIXME: what is that .onClick ?
		const childrenWithProps = React.Children.map(
			this.props.children,
			(child) => React.cloneElement(child, {
				onClick: this.onClick,
			})
		);
		const child = React.Children.only(childrenWithProps[0]);
		return (child);
	}
}

RegistryProvider.propTypes = {
	children: React.PropTypes.object,
};
RegistryProvider.childContextTypes = {
	registry: React.PropTypes.object,
};
