/**
 * @module react-cmf/lib/RegistryProvider
 */
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import Registry from './registry';
import CONST from './constant';

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

function Register(props, context) {
	let id;
	let item;
	if (props.component) {
		id = `${CONST.REGISTRY_COMPONENT}:${props.id}`;
		item = props.component;
	} else if (props.actionCreator) {
		id = `${CONST.REGISTRY_ACTION_CREATOR}:${props.id}`;
		item = props.actionCreator;
	} else if (props.expression) {
		id = `${CONST.REGISTRY_EXPRESSION}:${props.id}`;
		item = props.expression;
	}
	Registry.addToRegistry(id, item, context);
}

Register.contextTypes = {
	registry: PropTypes.object,
};
RegistryProvider.Register = Register;
RegistryProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
RegistryProvider.childContextTypes = {
	registry: PropTypes.object,
};
