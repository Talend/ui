import React, { PropTypes } from 'react';
import classNames from 'classnames';
import entries from 'lodash/entries';

import css from './JSONSchemaRenderer.scss';

const className = 'json-schema-renderer';

/**
 * UnkownTypeException
 *
 * @param {string} type - The unkown type
 * @returns {Object} An UnkownTypeException
 */
function UnkownTypeException(type) {
	this.name = 'UnkownTypeException';
	this.message = `Unkown type: ${type}`;
}

/**
 * InvalidSchemaException
 *
 * @returns {Object} An InvalidSchemaException
 */
function InvalidSchemaException() {
	this.name = 'InvalidSchemaException';
	this.message = 'Invalid Schema';
}

/**
 * textRenderer
 *
 * @param key
 * @param title
 * @param text
 * @returns {string} - HTML markup for a text component
 */
function textRenderer(key, title, text) {
	return (
		<div className={classNames('text-renderer', `text-renderer-${key}`)} key={key}>
			<dt>{title || key}</dt>
			<dd>{text}</dd>
		</div>
	);
}

function booleanRenderer(key, title, value) {
	return (
		<div className={classNames('boolean-renderer', `boolean-renderer-${key}`)} key={key}>
			<dt>{title || key}</dt>
			<dd>{value.toString()}</dd>
		</div>
	);
}

/**
 * arrayRenderer
 *
 * @param key
 * @param title
 * @param items
 * @returns {string} - HTML markup for an array component
 */
function arrayRenderer(key, title, items) {
	return (
		<div className={classNames(css.array, `array-renderer-${key}`)} key={key}>
			<dt>{title || key}</dt>
			{items.map((val, i) => <dd key={`key-${i}`}>{val}</dd>)}
		</div>
	);
}

const registry = {
	string: textRenderer,
	integer: textRenderer,
	boolean: booleanRenderer,
	array: arrayRenderer,
	object: objectRenderer, // eslint-disable-line no-use-before-define
};

/**
 * typeResolver
 *
 * @param schema - The JSONSchema of the data being rendered
 * @throws {UnkownTypeException} Type must be part of the registry
 * @returns {Function} resolver receiving data from a map operation
 */
function typeResolver(schema) {
	return function resolver(e) {
		if (!schema[e[0]]) {
			return null;
		}
		const type = schema[e[0]].type;
		const title = schema[e[0]].title;

		const renderer = registry[type];
		if (!renderer) {
			throw new UnkownTypeException(type);
		}

		return renderer(e[0], title, e[1], schema);
	};
}

/**
 * objectRenderer
 *
 * @param key
 * @param title
 * @param properties
 * @param schema
 * @returns {string} - HTML markup for an object component
 */
function objectRenderer(key, title, properties, schema) {
	const flattenProperties = entries(properties);
	const elements = flattenProperties.map(typeResolver(schema[key].properties));
	return (
		<div className={classNames(css.object, `object-renderer-${key}`)} key={key}>
			<h2>{title || key}</h2>
			<div>
				{elements}
			</div>
		</div>
	);
}

/**
 * orderProperties sorts properties based on uiSchema ui:order array
 *
 * @param order
 * @param properties
 * @returns {Array}
 */
function orderProperties(order, properties) {
	if (!order) {
		return properties;
	}
	return properties.sort((a, b) => {
		const aIndex = order.indexOf(a[0]);
		const bIndex = order.indexOf(b[0]);
		if (aIndex < 0) {
			return 1;
		}
		if (bIndex < 0) {
			return -1;
		}
		return aIndex - bIndex;
	});
}

/**
 * removeHiddenProperties removes the properties marked as hidden by the
 * uiSchema
 *
 * @param uiSchema
 * @param properties
 * @returns {Array}
 */
function removeHiddenProperties(uiSchema, properties) {
	return properties.reduce((acc, e) => {
		if (!uiSchema[e[0]] || uiSchema[e[0]]['ui:widget'] !== 'hidden') {
			acc.push(e);
		}
		return acc;
	}, []);
}

/**
 * JSONSchemaRenderer renders elements based on a JSONSchema and data
 *
 * @throws {InvalidSchemaException} schema must contain a jsonSchema and
 * properties
 * @returns {string} - HTML markup for the component
 */
function JSONSchemaRenderer(props) {
	if (!props.schema.jsonSchema || !props.schema.properties) {
		throw new InvalidSchemaException();
	}
	let properties = entries(props.schema.properties);
	if (props.schema.uiSchema) {
		properties = orderProperties(props.schema.uiSchema['ui:order'], properties);
		properties = removeHiddenProperties(props.schema.uiSchema, properties);
	}
	const elements = properties.map(typeResolver(props.schema.jsonSchema.properties));
	return (
		<dl className={classNames(css[className], 'json-schema-renderer')}>
			{elements}
		</dl>
	);
}

JSONSchemaRenderer.propTypes = {
	schema: PropTypes.shape({
		jsonSchema: PropTypes.object.isRequired,
		uiSchema: PropTypes.shape({
			'ui:order': PropTypes.array,
		}),
		properties: PropTypes.object.isRequired,
	}).isRequired,
};

JSONSchemaRenderer.InvalidSchemaException = InvalidSchemaException;
JSONSchemaRenderer.UnkownTypeException = UnkownTypeException;

export default JSONSchemaRenderer;
