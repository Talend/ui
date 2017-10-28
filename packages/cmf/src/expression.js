
import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import CONST from './constant';
import Registry from './registry';

/**
 * This module define expression which are just function
 * used to be called in the way you want in your APP with a context and a payload as params
 * @module react-cmf/lib/expression
 * @see module:react-cmf/lib/api
 */


/**
 * register an expression
 * @param {string} id the id of the expression to call it later
 * @param {function} func the function you want to register under this id
 * @param {object} context React context is optional
 */
function register(id, func, context) {
	Registry.addToRegistry(`${CONST.REGISTRY_EXPRESSION_PREFIX}:${id}`, func, context);
}


/**
 * get an expression from it's id
 * @param {string} id of the expression you want to get
 * @param {object} context React context is optional
 */
function get(id, context) {
	return Registry.getFromRegistry(`${CONST.REGISTRY_EXPRESSION_PREFIX}:${id}`, context);
}

/**
 * expressions are registred function which can be called through configuration
 * @param {string|object} expression to call
 * @param {object} React context
 * @param {object} payload will be in expression argument
 */
function call(expression, context, payload) {
	let id;
	let args;

	if (typeof expression === 'object') {
		id = expression.id;
		args = expression.args;
	} else if (typeof expression === 'string') {
		id = expression;
		args = [];
	}
	if (!id) {
		invariant(
			process.env.NODE_ENV === 'production',
			'you must provide an expression id'
		);
	}
	const check = get(id, context);
	if (!check) {
		invariant(
			process.env.NODE_ENV === 'production',
			`you must register expression ${id} first`
		);
	}
	return check({ context, payload }, ...args);
}

/**
 *
 * @param {object} props React props
 * @param {array} attrs of attribute to get
 * @param {object} context React context
 * @param {payload} payload optional payload to pass
 */
function getProps(props, attrs, context, payload = {}) {
	const newProps = Object.assign({}, props, payload);
	attrs.forEach((attr) => {
		const value = props[attr];
		if (typeof value === 'string' || typeof value === 'object') {
			newProps[attr] = call(value, context, newProps);
		}
	});
	return newProps;
}

/**
 * Internal: you should not have to use it
 * This function will compute a new props object with extra props
 * using the convention `fooExpression` will return { foo };
 * @param {object} state redux state
 * @param {object} ownProps any props you want to process with expression
 */
function mapStateToProps(state, ownProps) {
	const props = {};
	const context = {
		store: {
			getState: () => state,
		},
		registry: Registry.getRegistry(),
	};
	forIn(ownProps, (value, key) => {
		const match = regexExpression.exec(key);
		if (match) {
			props[match[1]] = call(props[match[0]], context, props);
		}
	});
	return props;
}

/**
 * Internal: you should not have to use it
 * this function cleanup the object by returning a new one by removing
 * all key that finish with Expression (ie `fooExpression`);
 * @param {object} props any props object
 */
function mergeProps(props) {
	const newProps = Object.assign({}, props);
	forIn(newProps, (value, key) => {
		const match = regexExpression.exec(key);
		if (match) {
			delete newProps[match[0]];
		}
	});
	return props;
}
/**
 *
 * @param {any} Component
 * @param {*} attrs
 */
function withExpression(Component, attrs) {
	function WithExpression(props, context) {
		return <Component {...getProps(props, attrs, context)} />;
	}
	WithExpression.contextTypes = {
		registry: PropTypes.object,
		router: PropTypes.object,
		store: PropTypes.object,
	};
	WithExpression.displayName = `WithExpression(${Component.displayName || Component.name})`;
	return WithExpression;
}

export default {
	register,
	get,
	call,
	getProps,
	withExpression,
	mapStateToProps,
	mergeProps,
};
