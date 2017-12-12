import React, { PropTypes } from 'react';
import { merge } from 'talend-json-schema-form-core';
/* eslint-disable no-param-reassign */

function parseArray(items, key) {
	if (items.type === 'object') {
		return parseProperties(items.properties, false, `${key}[]`);
	}
	return [getUISchemaFromObject(items, key)];
}

function getUISchemaFromObject(schema, key) {
	const ui = { key };
	if (schema.title) {
		ui.title = schema.title;
	}
	if (schema.description) {
		ui.description = schema.description;
	}
	if (schema.type === 'object') {
		ui.widget = 'fieldset';
		ui.items = parseProperties(schema.properties, false, key);
	} else if (schema.type === 'string') {
		if (!schema.enum) {
			ui.widget = 'text';
		}
		if (schema.format) {
			ui.type = schema.format;
			if (schema.format === 'uri') {
				ui.type = 'url';
			} if (schema.format === 'data-url') {
				ui.type = 'file';
			}
		}
	} else if (schema.type === 'array') {
		ui.widget = 'array';
		ui.items = parseArray(schema.items, key);
	} else if (schema.type === 'number') {
		ui.widget = 'text';
		ui.type = 'number';
	}
	return ui;
}

function parseProperties(properties, isRoot, path) {
	if (isRoot) {
		return [getUISchemaFromObject(properties)];
	}
	return Object.keys(properties).map(key =>
		getUISchemaFromObject(properties[key], path ? `${path}.${key}` : key),
	);
}

export const wrapCustomWidget = Component => {
	function TFMigratedWidget(props) {
		const newProps = Object.assign({}, props);
		newProps.formContext = props.formContext || {};
		if (props.schema.titleMap) {
			// old one has enumNames in the schema but we have props.titleMap
			newProps.options = {
				enumOptions: props.schema.titleMap.map(item => ({ value: item.value, label: item.name })),
			};
		} else if (props.schema.schema.enum) {
			newProps.schema.enum = props.schema.schema.enum;
		}
		const onChange = props.onChange;
		newProps.onChange = (event, payload) => {
			if (!payload) {
				onChange({}, { schema: newProps.schema, value: event });
				// TODO: trigger !
				if (props.schema.triggers && props.onTrigger) {
					props.onTrigger({}, {
						schema: newProps.schema,
						value: event,
						propertyName: newProps.schema.key.join('.'),
						propertyValue: event,
					});
				}
			} else {
				onChange(event, payload);
			}
		};
		return <Component {...newProps} />;
	}
	TFMigratedWidget.propTypes = {
		formContext: PropTypes.object,
		onChange: PropTypes.func,
		onTrigger: PropTypes.func,
		schema: PropTypes.object,
		titleMap: PropTypes.array,
	};
	TFMigratedWidget.displayName = 'TFMigratedWidget';
	return TFMigratedWidget;
};

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
 * migrate from react-jsonschema-form to UIschema
 * @param {Object} mergedSchema
 */
export function migrate(jsonSchema, uiSchema) {
	const safeUISchema = parseProperties(jsonSchema, true);
	const widgets = {};
	if (!uiSchema || uiSchema === {}) {
		return { jsonSchema, uiSchema: safeUISchema };
	} else if (!Array.isArray(uiSchema) && typeof uiSchema === 'object') {
		if (uiSchema['ui:order']) {
			safeUISchema[0].items = uiSchema['ui:order'].map(key =>
				getUISchemaFromObject(jsonSchema.properties[key], key),
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
	const props = migrate(jsonSchema, uiSchema);
	props.mergedSchema = merge(props.jsonSchema, props.uiSchema);
	return props;
};
