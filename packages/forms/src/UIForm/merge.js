import { merge } from 'talend-json-schema-form-core';

/**
 * migrate from react-jsonschema-form to UIschema
 * @param {Object} mergedSchema
 */
function migrate(jsonSchema, uiSchema) {
	if (!uiSchema) {
		return [jsonSchema, ['*']];
	} else if (!Array.isArray(uiSchema) && typeof uiSchema === 'object') {
		const get = key => {
			const config = uiSchema[key] || {};
			const schema = jsonSchema.properties[key];
			if (!schema) {
				return { key };
			}
			const ui = {
				key,
				title: schema.title,
				description: schema.description,
			};
			if (config['ui:widget']) {
				ui.widget = config['ui:widget'];
				if (config['ui:widget'] === 'password') {
					delete ui.widget;
					ui.type = 'password';
				}
			}
			if (config['ui:autofocus']) {
				ui.autoFocus = config['ui:autofocus'];
			}
			if (config['ui:help']) {
				ui.help = config['ui:help'];
			}
			return ui;
		};

		if (uiSchema['ui:order']) {
			return [jsonSchema, uiSchema['ui:order'].map(get)];
		}
		return [jsonSchema, Object.keys(jsonSchema.properties).map(get)];
	}
	return [jsonSchema, uiSchema];
}

export default (jsonSchema, uiSchema) => merge(...migrate(jsonSchema, uiSchema));
