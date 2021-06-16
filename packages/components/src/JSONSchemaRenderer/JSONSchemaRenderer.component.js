import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import entries from 'lodash/entries';
import get from 'lodash/get';

import css from './JSONSchemaRenderer.scss';

const CLASS_NAME = 'json-schema-renderer';

const RendererProptypes = {
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
 * UnknownTypeException
 *
 * @param {string} type - The Unknown type
 * @returns {Object} An UnknownTypeException
 */
function UnknownTypeException(type) {
	this.name = 'UnknownTypeException';
	this.message = `Unknown type: ${type}`;
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
 * NullRenderer renders nothing to hide specified properties
 * or properties that don't have a corresponding schema definition
 *
 * @returns null
 */
function NullRenderer() {
	return null;
}

/**
 * TextRenderer renders text based properties (string and numbers)
 */
function TextRenderer({ propertyKey, title, properties }) {
	return [
		<dt key={`${propertyKey}_key`}>{title || propertyKey}</dt>,
		<dd key={`${propertyKey}_value`}>{properties}</dd>,
	];
}
TextRenderer.propTypes = {
	...RendererProptypes,
	properties: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

function PasswordRenderer({ propertyKey, title }) {
	return [
		<dt key={`${propertyKey}_key`}>{title || propertyKey}</dt>,
		<dd key={`${propertyKey}_value`}>{'\u2022'.repeat(5)}</dd>,
	];
}
PasswordRenderer.propTypes = {
	...RendererProptypes,
	properties: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * booleanRenderer renders boolean properties
 */
function BooleanRenderer({ propertyKey, title, properties }) {
	return [
		<dt key={`${propertyKey}_key`}>{title || propertyKey}</dt>,
		<dd key={`${propertyKey}_value`}>{properties}</dd>,
	];
}
BooleanRenderer.propTypes = {
	...RendererProptypes,
	properties: PropTypes.bool.isRequired,
};

/**
 * arrayRenderer renders an array of properties
 */
function ArrayRenderer({ propertyKey, title, properties }) {
	return [<dt key={`${propertyKey}_key`}>{title || propertyKey}</dt>].concat(
		properties.map((val, i) => (
			<dd key={`${propertyKey}-value-${i}`} className={css['array-value']}>
				{val}
			</dd>
		)),
	);
}
ArrayRenderer.propTypes = {
	...RendererProptypes,
	properties: PropTypes.arrayOf(PropTypes.shape({ ...RendererProptypes })).isRequired,
};

const registry = {
	string: TextRenderer,
	integer: TextRenderer,
	boolean: BooleanRenderer,
	array: ArrayRenderer,
	object: ObjectRenderer, // eslint-disable-line @typescript-eslint/no-use-before-define
};

function isHidden(uiSchema, element) {
	return uiSchema && uiSchema[element] && uiSchema[element]['ui:widget'] === 'hidden';
}

function isPassword(uiSchema, element) {
	return get(uiSchema, [element, 'ui:widget'], '') === 'password';
}

/**
 * typeResolver
 *
 * @param schema - The JSONSchema of the data being rendered
 * @param uiSchema
 * @throws {UnknownTypeException} Type must be part of the registry
 * @returns {Object} Resolved Renderer and props
 */
function typeResolver(schema, uiSchema) {
	return function resolver(e) {
		if (!schema[e[0]]) {
			return { render: NullRenderer };
		}
		if (isHidden(uiSchema, e[0])) {
			return { render: NullRenderer };
		}

		const type = schema[e[0]].type;
		const title = schema[e[0]].title;

		if (isPassword(uiSchema, e[0])) {
			return {
				render: PasswordRenderer,
				propertyKey: e[0],
				title,
				properties: e[1],
				schema,
				uiSchema,
			};
		}

		const renderer = registry[type];
		if (!renderer) {
			throw new UnknownTypeException(type);
		}

		return {
			render: renderer,
			propertyKey: e[0],
			title,
			properties: e[1],
			schema,
			uiSchema,
		};
	};
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
 * objectRenderer renders nested properties
 */
function ObjectRenderer({ propertyKey, title, uiSchema, schema, properties, ...props }) {
	return [
		<dt key={`${propertyKey}_key`}>
			<h2>{title || propertyKey}</h2>
		</dt>,
		<dd key={`${propertyKey}_value`}>
			<JSONSchemaRenderer
				schema={{
					jsonSchema: schema[propertyKey],
					uiSchema: uiSchema[propertyKey],
					properties,
				}}
				className={css.nested}
				{...props}
			/>
		</dd>,
	];
}

ObjectRenderer.propTypes = {
	...RendererProptypes,
	schema: PropTypes.shape(SchemaProptypes),
};

/**
 * JSONSchemaRenderer renders elements based on a JSONSchema and data
 *
 * @throws {InvalidSchemaException} schema must contain a jsonSchema and
 * properties
 * @returns {string} - HTML markup for the component
 */
function JSONSchemaRenderer({ schema, className, ...props }) {
	if (!schema.jsonSchema || !schema.properties) {
		throw new InvalidSchemaException();
	}
	let properties = entries(schema.properties);
	if (schema.uiSchema) {
		properties = orderProperties(schema.uiSchema['ui:order'], properties);
	}
	const elements = properties.map(typeResolver(schema.jsonSchema.properties, schema.uiSchema));
	return (
		<dl className={classNames(css[CLASS_NAME], 'json-schema-renderer', className)} {...props}>
			{elements.map(({ render, ...rest }) => render(rest))}
		</dl>
	);
}

JSONSchemaRenderer.displayName = 'JSONSchemaRenderer';

JSONSchemaRenderer.propTypes = {
	schema: PropTypes.shape(SchemaProptypes),
	className: PropTypes.string,
};

JSONSchemaRenderer.InvalidSchemaException = InvalidSchemaException;
JSONSchemaRenderer.UnknownTypeException = UnknownTypeException;

export default JSONSchemaRenderer;
