import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import entries from 'lodash/entries';

import css from './JSONSchemaRenderer.scss';

const CLASS_NAME = 'json-schema-renderer';

export const RendererProptypes = {
	propertyKey: PropTypes.string.isRequired,
	title: PropTypes.string,
};

const SchemaProptypes = {
	jsonSchema: PropTypes.object.isRequired,
	uiSchema: PropTypes.shape({
		'ui:order': PropTypes.array,
	}),
	properties: PropTypes.object.isRequired,
};

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
 * HiddenRenderer renders nothing to hide specified properties
 *
 * @returns null
 */
function HiddenRenderer() {
	return null;
}

/**
 * UnkownRenderer renders nothing in case the property doesn't have a
 * coresponding schema definition
 *
 * @returns {undefined}
 */
function UnkownRenderer() {
	return null;
}

/**
 * TextRenderer renders text based properties (string and numbers)
 */
function TextRenderer({ propertyKey, title, properties }) {
	return (
		<div className={classNames('text-renderer', `text-renderer-${propertyKey}`)} key={propertyKey}>
			<dt>{title || propertyKey}</dt>
			<dd>{properties}</dd>
		</div>
	);
}

TextRenderer.propTypes = {
	...RendererProptypes,
	properties: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};

/**
 * booleanRenderer renders boolean properties
 */
function BooleanRenderer({ propertyKey, title, properties }) {
	return (
		<div className={classNames('boolean-renderer', `boolean-renderer-${propertyKey}`)} key={propertyKey}>
			<dt>{title || propertyKey}</dt>
			<dd>{properties.toString()}</dd>
		</div>
	);
}

BooleanRenderer.propTypes = {
	...RendererProptypes,
	properties: PropTypes.bool.isRequired,
};

/**
 * arrayRenderer renders an array of properties
 */
function ArrayRenderer({ propertyKey, title, properties }) {
	return (
		<div className={classNames(css.array, `array-renderer-${propertyKey}`)} key={propertyKey}>
			<dt>{title || propertyKey}</dt>
			{properties.map((val, i) => <dd key={`propertyKey-${i}`}>{val}</dd>)}
		</div>
	);
}

ArrayRenderer.propTypes = {
	...RendererProptypes,
	properties: PropTypes.arrayOf(
		PropTypes.shape({ ...RendererProptypes })
	).isRequired,
};

const registry = {
	string: TextRenderer,
	integer: TextRenderer,
	boolean: BooleanRenderer,
	array: ArrayRenderer,
	object: ObjectRenderer, // eslint-disable-line no-use-before-define
};

function isHidden(uiSchema, element) {
	return uiSchema && uiSchema[element] && uiSchema[element]['ui:widget'] === 'hidden';
}

/**
 * typeResolver
 *
 * @param schema - The JSONSchema of the data being rendered
 * @param uiSchema
 * @throws {UnkownTypeException} Type must be part of the registry
 * @returns {Object} Resolved Renderer and props
 */
function typeResolver(schema, uiSchema) {
	return function resolver(e) {
		if (!schema[e[0]]) {
			return { Renderer: UnkownRenderer };
		}
		if (isHidden(uiSchema, e[0])) {
			return { Renderer: HiddenRenderer };
		}

		const type = schema[e[0]].type;
		const title = schema[e[0]].title;

		const renderer = registry[type];
		if (!renderer) {
			throw new UnkownTypeException(type);
		}

		return {
			Renderer: renderer,
			propertyKey: e[0],
			title,
			properties: e[1],
			schema,
			uiSchema,
		};
	};
}

/**
 * objectRenderer renders nested properties
 */
function ObjectRenderer({ propertyKey, title, properties, schema, uiSchema = {} }) {
	const flattenProperties = entries(properties);
	const elements = flattenProperties.map(
		typeResolver(schema[propertyKey].properties,
		uiSchema[propertyKey])
	);
	return (
		<div className={classNames(css.object, `object-renderer-${propertyKey}`)} key={propertyKey}>
			<h2>{title || propertyKey}</h2>
			<div>
				{elements.map(({ Renderer, ...rest }) => <Renderer {...rest} />)}
			</div>
		</div>
	);
}


ObjectRenderer.propTypes = {
	...RendererProptypes,
	schema: PropTypes.shape(SchemaProptypes),
};

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
 * JSONSchemaRenderer renders elements based on a JSONSchema and data
 *
 * @throws {InvalidSchemaException} schema must contain a jsonSchema and
 * properties
 * @returns {string} - HTML markup for the component
 */
function JSONSchemaRenderer({ schema, className }) {
	if (!schema.jsonSchema || !schema.properties) {
		throw new InvalidSchemaException();
	}
	let properties = entries(schema.properties);
	if (schema.uiSchema) {
		properties = orderProperties(schema.uiSchema['ui:order'], properties);
	}
	const elements = properties.map(typeResolver(schema.jsonSchema.properties, schema.uiSchema));
	return (
		<dl className={classNames(css[CLASS_NAME], 'json-schema-renderer', className)}>
			{elements.map(({ Renderer, ...rest }) => <Renderer {...rest} />)}
		</dl>
	);
}

JSONSchemaRenderer.propTypes = {
	schema: PropTypes.shape({ ...SchemaProptypes }),
	className: PropTypes.string,
};

JSONSchemaRenderer.InvalidSchemaException = InvalidSchemaException;
JSONSchemaRenderer.UnkownTypeException = UnkownTypeException;

export default JSONSchemaRenderer;
