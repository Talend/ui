/**
 * @module react-cmf/lib/RegistryProvider
 */
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import Registry from './registry';
import action from './action';
import expression from './expression';
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
		id = `${CONST.REGISTRY_COMPONENT_PREFIX}:${props.id}`;
		item = props.component;
		Registry.addToRegistry(id, item, context);
		if (item.actions) {
			Object.keys(item.actions).forEach((key) => {
				action.registerActionCreator(key, item.actions[key], context);
			});
		}
		if (item.expressions) {
			Object.keys(item.expressions).forEach((key) => {
				expression.register(key, item.expressions[key], context);
			});
		}
	} else if (props.actionCreator) {
		action.registerActionCreator(props.id, props.actionCreator, context);
	} else if (props.expression) {
		expression.register(props.id, props.expression, context);
	}
	return null;
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
