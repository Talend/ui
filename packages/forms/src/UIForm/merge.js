import { merge } from 'talend-json-schema-form-core';

function parseArray(items, key) {
	console.log('parseArray key', key);
	if (items.type === 'object') {
		return parseProperties(items.properties, false, `${key}[]`);
	}
	return [getUISchemaFromObject(items, key)];
}

function getUISchemaFromObject(schema, key) {
	const ui = {
		key,
		title: schema.title,
		description: schema.description,
	};
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
function migrate(jsonSchema, uiSchema) {
	let safeUISchema = parseProperties(jsonSchema, true);
	console.log(safeUISchema);
	if (!uiSchema || uiSchema === {}) {
		return [jsonSchema, safeUISchema];
	} else if (!Array.isArray(uiSchema) && typeof uiSchema === 'object') {
		if (uiSchema['ui:order']) {
			safeUISchema = uiSchema['ui:order'].map(key =>
				getUISchemaFromObject(jsonSchema.properties[key], key),
			);
		}
		safeUISchema = safeUISchema.map(ui => {
			if (ui.key && uiSchema[ui.key]) {
				const config = uiSchema[ui.key];
				if (config['ui:widget']) {
					ui.widget = config['ui:widget'];
					if (config['ui:widget'] === 'password') {
						delete ui.widget;
						ui.type = 'password';
					}
					if (config['ui:widget'] === 'updown') {
						delete ui.widget;
						ui.type = 'number';
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
		return [jsonSchema, safeUISchema];
	}
	return [jsonSchema, uiSchema];
}

export default (jsonSchema, uiSchema) => merge(...migrate(jsonSchema, uiSchema));
