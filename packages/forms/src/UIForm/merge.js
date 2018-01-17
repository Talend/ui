import React, { PropTypes } from 'react';
import { merge } from 'talend-json-schema-form-core';
import get from 'lodash/get';

import FieldTemplate from './fields/FieldTemplate';

/* eslint-disable no-param-reassign */

/**
 * Return a UISchema based on the jsonSchema.
 * So this is the default uiSchema.
 * @param {Object} schema the jsonSchema part
 * @param {string} key the current key for hierachical parsing
 */
function getUISchemaFromObject(schema, key) {
	const ui = { key };
	if (schema.title) {
		ui.title = schema.title;
	}
	if (schema.description) {
		ui.description = schema.description;
	}
	if (schema.enum && schema.enumNames) {
		ui.titleMap = schema.enum.map((value, index) => ({ value, name: schema.enumNames[index] }));
		// delete schema.enumNames;
	}
	if (schema.type === 'object') {
		ui.widget = 'fieldset';
		// eslint-disable-next-line no-use-before-define
		ui.items = parseProperties(schema.properties, false, key);
	} else if (schema.type === 'string') {
		ui.widget = 'text';
		if (schema.enum) {
			ui.schema = schema;
			ui.widget = 'select';
		}
		if (schema.format) {
			ui.type = schema.format;
			if (schema.format === 'uri') {
				ui.type = 'url';
			}
			if (schema.format === 'data-url') {
				ui.type = 'file';
			}
		}
	} else if (schema.type === 'array') {
		ui.widget = 'array';
		if (schema.items.type === 'object') {
			// eslint-disable-next-line no-use-before-define
			ui.items = parseProperties(schema.items.properties, false, `${key}[]`);
		} else {
			ui.items = [getUISchemaFromObject(schema.items, key)];
		}
	} else if (schema.type === 'number') {
		ui.widget = 'text';
		ui.type = 'number';
	}
	return ui;
}

/**
 * Generate uiSchema items from the jsonSchema properties
 * @param {Object} properties
 * @param {boolean} isRoot true if we are on the jsonSchema entry
 * @param {string} path to prefix key for hierarchical
 * @return {Array} uiSchema
 */
function parseProperties(properties, isRoot, path) {
	if (isRoot) {
		return [getUISchemaFromObject(properties)];
	}
	return Object.keys(properties).map(key =>
		getUISchemaFromObject(properties[key], path ? `${path}.${key}` : key),
	);
}

/**
 * HOC to wrap widget for the `Form` and make it run well in the `UIForm`.
 * @param {React.Component} Component
 */
export const wrapCustomWidget = Component => {
	if (Component.displayName === 'TFMigratedWidget') {
		return Component;
	}
	function TFMigratedWidget(props) {
		const newProps = {
			...props,
			formContext: props.formContext || {},
			required: props.schema.required,
			placeholder: props.schema.placeholder,
			options: props.schema.options,
		};

		if (get(props, 'schema.titleMap')) {
			// backward compat, some widgets wait for options
			newProps.options = {
				enumOptions: props.schema.titleMap.map(item => ({ value: item.value, label: item.name })),
			};
		}
		if (get(props, 'schema.schema.enum')) {
			newProps.schema.enum = props.schema.schema.enum;
		}
		if (props.onChange) {
			const onChange = props.onChange;
			newProps.onChange = (event, payload) => {
				if (!payload) {
					onChange({}, { schema: newProps.schema, value: event });
					if (props.onFinish) {
						props.onFinish({}, { schema: newProps.schema, value: event });
					}
				} else {
					onChange(event, payload);
					if (props.onFinish) {
						props.onFinish({}, payload);
					}
				}
			};
		}

		return (
			<FieldTemplate label={props.schema.title} id={newProps.id}>
				<Component {...newProps} />
			</FieldTemplate>
		);
	}
	TFMigratedWidget.propTypes = {
		formContext: PropTypes.object,
		onChange: PropTypes.func,
		onFinish: PropTypes.func,
		schema: PropTypes.object,
		titleMap: PropTypes.array,
	};
	TFMigratedWidget.displayName = 'TFMigratedWidget';
	return TFMigratedWidget;
};

/**
 * Update the uiSchema generated from the jsonSchema with the provided uiSchema
 * @param {Array} items
 * @param {Object} uiSchema
 * @param {Object} widgets
 * @param {String} prefix
 */
function updateWidgets(items, uiSchema, widgets, prefix) {
	return items.map(ui => {
		const uiSchemaKey = ui.key.replace(prefix, '');
		if (ui.key && uiSchema[uiSchemaKey]) {
			const config = uiSchema[uiSchemaKey];
			Object.keys(config || {}).forEach(configKey => {
				if (!configKey.startsWith('ui:')) {
					return;
				}
				if (configKey === 'ui:widget') {
					const uiWidget = config[configKey];
					if (typeof uiWidget !== 'string') {
						widgets[uiWidget.name || ui.key] = wrapCustomWidget(uiWidget);
						ui.widget = uiWidget.name || ui.key;
					} else {
						ui.widget = uiWidget;
						if (uiWidget === 'updown') {
							ui.widget = 'text';
							ui.type = 'number';
						} else if (uiWidget === 'password') {
							ui.widget = 'text';
							ui.type = 'password';
						} else if (uiWidget === 'url') {
							ui.widget = 'text';
							ui.type = 'url';
						} else if (uiWidget === 'color') {
							ui.widget = 'text';
							ui.type = 'color';
						} else if (uiWidget === 'radio') {
							ui.widget = 'radios';
						} else if (uiWidget === 'enumeration') {
							delete ui.items;
						}
					}
				} else if (configKey === 'ui:placeholder') {
					ui.placeholder = config['ui:placeholder'];
				} else if (configKey === 'ui:options') {
					ui.options = config['ui:options'];
				} else if (configKey === 'ui:autofocus') {
					ui.autoFocus = config['ui:autofocus'];
				} else if (configKey === 'ui:help') {
					ui.helpvalue = config['ui:help'];
				} else if (config['ui:trigger']) {
					ui.triggers = config['ui:trigger'];
				} else {
					ui[configKey.replace('ui:', '')] = config[configKey];
				}
			});
			if (ui.items && config && ui.widget !== 'enumeration') {
				ui.items = updateWidgets(ui.items, config, widgets, `${ui.key}.`);
			}
		}
		return ui;
	});
}

/**
 * migrate from react-jsonschema-form to UISchema
 * @param {Object} mergedSchema
 */
export function migrate(jsonSchema, uiSchema) {
	const safeUISchema = parseProperties(jsonSchema, true);
	const widgets = {};
	if (!uiSchema) {
		return { jsonSchema, uiSchema: safeUISchema };
	} else if (!Array.isArray(uiSchema) && typeof uiSchema === 'object') {
		if (uiSchema['ui:order']) {
			safeUISchema[0].items.sort(
				(left, right) =>
					uiSchema['ui:order'].indexOf(left.key) - uiSchema['ui:order'].indexOf(right.key),
			);
		}
		safeUISchema[0].items = updateWidgets(safeUISchema[0].items, uiSchema, widgets);
		return {
			jsonSchema,
			widgets,
			uiSchema: safeUISchema,
		};
	}
	return {
		jsonSchema,
		uiSchema,
		widgets,
	};
}

export default (jsonSchema, uiSchema) => {
	let props = { jsonSchema, uiSchema };
	if (!jsonSchema) {
		return props;
	}
	if (!Array.isArray(uiSchema)) {
		props = migrate(jsonSchema, uiSchema);
	}
	props.mergedSchema = merge(props.jsonSchema, props.uiSchema);
	return props;
};
