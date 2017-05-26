import React, { PropTypes } from 'react';
import classNames from 'classnames';
import entries from 'lodash/entries';

import css from './JSONSchemaRenderer.scss';

const className = 'json-schema-renderer';

/**
 * UnkownTypeException
 *
 * @param type - The unkown type
 * @returns {undefined}
 */
function UnkownTypeException(type) {
	this.name = 'UnkownTypeException';
	this.message = `Unkown type: ${type}`;
}

/**
 * InvalidSchemaException
 *
 * @returns {undefined}
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
		<div className={css.text} key={key}>
			<dt>{title}</dt>
			<dd>{text}</dd>
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
		<div className={css.array} key={key}>
			<dt>{title || key}</dt>
			{items.map((val, i) => <dd key={`key-${i}`}>{val}</dd>)}
		</div>
	);
}

function objectRenderer(key, title, properties, schema) {
	const props = entries(properties);
	const elements = props.map(typeResolver(schema[key]));
	console.log('Object', elements);
	return (
		<div className={css.object} key={key}>
			<h2>{title || key}</h2>
			<div>
				{elements}
			</div>
		</div>
	);
}

const registry = {
	string: textRenderer,
	integer: textRenderer,
	array: arrayRenderer,
	object: objectRenderer,
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
		console.log('Resolve', e);
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
	const properties = entries(props.schema.properties);
	const elements = properties.map(typeResolver(props.schema.jsonSchema.properties));
	return (
		<dl className={classNames(css[className])}>
			{elements}
		</dl>
	);
}

JSONSchemaRenderer.propTypes = {
	schema: PropTypes.shape({
		jsonSchema: PropTypes.object.isRequired,
		properties: PropTypes.object.isRequired,
	}).isRequired,
};

JSONSchemaRenderer.InvalidSchemaException = InvalidSchemaException;
JSONSchemaRenderer.UnkownTypeException = UnkownTypeException;

export default JSONSchemaRenderer;
