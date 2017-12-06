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
		ui.widget = 'text';
		if (schema.format) {
			ui.type = schema.format;
			if (schema.format === 'uri') {
				ui.type = 'url';
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

function updateWidgets(items, uiSchema, widgets, prefix) {
	return items.map(ui => {
		const uiSchemaKey = ui.key.replace(prefix, '');
		if (ui.key && uiSchema[uiSchemaKey]) {
			const config = uiSchema[uiSchemaKey];
			const uiWidget = config['ui:widget'];
			if (uiWidget) {
				if (typeof uiWidget !== 'string') {
					widgets[uiWidget.name || ui.key] = uiWidget;
					ui.widget = uiWidget.name || ui.key;
				} else {
					ui.widget = uiWidget;
					if (uiWidget === 'updown') {
						ui.widget = 'number';
						// ui.widget = 'text';
						// ui.type = 'number';
					// } else if (uiWidget === 'password') {
						// 	ui.widget = 'text';
						// 	ui.type = 'password';
					} else if (uiWidget === 'color') {
						// ui.widget = 'text';
						ui.type = 'color';
					} else if (uiWidget === 'radio') {
						ui.widget = 'radios';
					} else if (uiWidget === 'enumeration') {
						delete ui.items;
					}
				}
			}
			if (config['ui:autofocus']) {
				ui.autoFocus = config['ui:autofocus'];
			}
			if (config['ui:help']) {
				ui.helpvalue = config['ui:help'];
			}
			if (config['ui:disabled']) {
				ui.disabled = true;
			}
			if (config['ui:readonly']) {
				ui.readonly = true;
			}
			if (config['ui:options']) {
				ui.options = config['ui:options'];
			}
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
		console.log(uiSchema);
		console.log('merged uiSchema', JSON.stringify(safeUISchema, null, 2));
		return {
			jsonSchema,
			widgets,
			uiSchema: safeUISchema,
		};
	}
	return {
		jsonSchema,
		uiSchema,
	};
}

export default (jsonSchema, uiSchema) => {
	const props = migrate(jsonSchema, uiSchema);
	props.mergedSchema = merge(props.jsonSchema, props.uiSchema);
	return props;
};
