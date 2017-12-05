import { merge } from 'talend-json-schema-form-core';
/* eslint-disable no-param-reassign */

function parseArray(items, key) {
	console.log('parseArray key', key);
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

		safeUISchema[0].items = safeUISchema[0].items.map(ui => {
			if (ui.key && uiSchema[ui.key]) {
				const config = uiSchema[ui.key];
				const uiWidget = config['ui:widget'];
				if (uiWidget) {
					if (typeof uiWidget !== 'string') {
						console.log(uiWidget, uiWidget);
						widgets[uiWidget.name || ui.key] = uiWidget;
						ui.widget = uiWidget.name || ui.key;
					} else {
						ui.widget = config['ui:widget'];
						if (config['ui:widget'] === 'password') {
							ui.widget = 'text';
							ui.type = 'password';
						} else if (config['ui:widget'] === 'updown') {
							ui.widget = 'text';
							ui.type = 'number';
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
					Object.assign(ui, config['ui:options']);
				}
			}
			return ui;
		});
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
