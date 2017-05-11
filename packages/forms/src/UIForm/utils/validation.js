import { validate } from 'talend-json-schema-form-core';

import { getValue } from './properties';

/**
 * Validate values.
 * @param mergedSchema The merged schema.
 * @param properties The values.
 * @returns {object} The validation result by field.
 */
export function validateAll(mergedSchema, properties) {
	const validations = {};
	mergedSchema.forEach((schema) => {
		const { key, items } = schema;
		if (key) {
			validations[key] = validate(
				schema,
				getValue(properties, key)
			);
		}
		if (items) {
			const subValidations = validateAll(items, properties);
			Object.assign(validations, subValidations);
		}
	});
	return validations;
}

/**
 * Check if a schema value is invalid.
 * It is invalid if :
 * - the schema is an invalid field (validations[key] = { valid: false })
 * - the schema has items (ex: fieldset, tabs, ...), and at least one of them is invalid
 * @param schema The schema
 * @param validations The validations results
 * @returns {boolean} true if it is invalid, false otherwise
 */
export function isValid(schema, validations) {
	const { key, items } = schema;
	if (key && validations[key] && !validations[key].valid) {
		return false;
	}

	if (items) {
		for (const itemSchema of items) {
			if (!isValid(itemSchema, validations)) {
				return false;
			}
		}
	}

	return true;
}
