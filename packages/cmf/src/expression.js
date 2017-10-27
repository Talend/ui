import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import forIn from 'lodash/forIn';

import CONST from './constant';
import Registry from './registry';

const regexExpression = new RegExp('(.*)Expression');

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
		invariant(process.env.NODE_ENV === 'production', 'you must provide an expression id');
	}
	const check = get(id, context);
	if (!check) {
		invariant(process.env.NODE_ENV === 'production', `you must register expression ${id} first`);
	}
	return check({ context, payload }, ...args);
}

/**
 *
 * @param {object} props React props
 * @param {array} attrs of attribute to get
 * @param {object} context React context
 * @param {payload} payload optional payload to pass
 * @deprecated the array param will be deprecated and replaced with context
 * @deprecated the context will be replaced by the payload
 */
function getProps(props, attrs, context, payload = {}) {
	const newProps = Object.assign({}, props, payload);
	attrs.forEach(attr => {
		console.warn(
			`beware this is present just for the sake of backward compatibility,
			you should use properties ending with Expression to see them evaluated
			example: instead of using ${attr}, ${attr}Expression will be evaluated
			and result put in ${attr}`,
		);// eslint no-console: ["error", { allow: ["warn"] }]
		const value = props[attr];
		if (typeof value === 'string' || typeof value === 'object') {
			newProps[attr] = call(value, context, newProps);
		}
	});
	forIn(props, (value, key) => {
		const match = regexExpression.exec(key);
		if (match) {
			newProps[match[1]] = call(props[match[0]], context, newProps);
			delete newProps[match[0]];
		}
	});
	return newProps;
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
};
