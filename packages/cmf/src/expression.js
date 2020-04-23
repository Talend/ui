import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import forIn from 'lodash/forIn';

import CONST from './constant';
import registry from './registry';

const regexExpression = new RegExp('(.*)Expression');

/**
 * @typedef {Object} Context
 * @property {string} store
 * @property {string} registry
 */

/**
 * This module define expression which are just function
 * used to be called in the way you want in your APP with a context and a payload as params
 * @module react-cmf/lib/expression
 */

/**
 * register an expression
 * @param {string} id the id of the expression to call it later
 * @param {function} func the function you want to register under this id
 * @param {Context} context React context is optional
 */
function register(id, func, context) {
	registry.addToRegistry(`${CONST.REGISTRY_EXPRESSION_PREFIX}:${id}`, func, context);
}

/**
 * get an expression from it's id
 * @param {string} id of the expression you want to get
 * @param {Context} context React context is optional
 */
function get(id, context) {
	return registry.getFromRegistry(`${CONST.REGISTRY_EXPRESSION_PREFIX}:${id}`, context);
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
 * this function will try to find all props.properties that should be evaluated agains
 * a registered function, the attrs parameter will be deprecated.
 * Each parameter name ending with Expression will be automaticaly evaluated
 * against their registered Expression and the result put inside a properties with name
 * matching the original expression attributes minus the 'Expression' part
 *
 * @param {Object.<string, *>} props React props
 * @param {Array.<string>} attrs of attribute to get
 * @param {Context} context React context
 * @param {payload} payload optional payload to pass
 * @deprecated the array param will be deprecated and replaced with context
 * @deprecated the context will be replaced by the payload
 */
function getProps(props, attrs, context, payload = {}) {
	const newProps = { ...props, ...payload };
	attrs.forEach(attr => {
		const value = props[attr];
		if (typeof value === 'string' || typeof value === 'object') {
			// eslint-disable-next-line
			console.warn(
				`beware this is present just for the sake of backward compatibility,
				you should use properties ending with Expression to see them evaluated
				example: instead of using ${attr}, ${attr}Expression will be evaluated
				and result put in ${attr}`,
			);
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
 * Internal: you should not have to use it
 * This function will compute a new props object with extra props
 * using the convention `fooExpression` will return { foo };
 * @param {object} state redux state
 * @param {object} ownProps any props you want to process with expression
 */
function mapStateToProps(state, ownProps, ctx = {}) {
	const props = {};
	const context = {
		store: {
			getState: () => state,
		},
		registry: registry.getRegistry(),
		...ctx,
	};
	forIn(ownProps, (value, key) => {
		const match = regexExpression.exec(key);
		if (match) {
			props[match[1]] = call(ownProps[match[0]], context, ownProps);
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
	const newProps = { ...props };
	forIn(newProps, (value, key) => {
		const match = regexExpression.exec(key);
		if (match) {
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
		store: PropTypes.object,
		router: PropTypes.object,
	};
	WithExpression.displayName = `WithExpression(${Component.displayName || Component.name})`;
	return WithExpression;
}

const registerMany = registry.getRegisterMany(register);

export default {
	register,
	registerMany,
	get,
	call,
	getProps,
	withExpression,
	mapStateToProps,
	mergeProps,
};
