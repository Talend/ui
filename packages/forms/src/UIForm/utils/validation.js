import { validate } from 'talend-json-schema-form-core';
import { getValue } from '../utils/properties';

/**
 * Validate values.
 * @param schema The merged schema.
 * @param value The value.
 * @param properties The values.
 * @param customValidationFn A custom validation function
 * that is applied on schema.customValidation = true
 * @returns {object} The validation result.
 */
export function validateValue(schema, value, properties, customValidationFn) {
	const staticResult = validate(schema, value);
	if (staticResult.valid && schema.customValidation && customValidationFn) {
		return customValidationFn(schema, value, properties);
	}
	return staticResult.valid ? null : staticResult.error.message;
}

/**
 * Validate values.
 * @param mergedSchema The merged schema array.
 * @param properties The values.
 * @param customValidationFn A custom validation function
 * that is applied on schema.customValidation = true
 * @returns {object} The validation result by field.
 */
export function validateAll(mergedSchema, properties, customValidationFn) {
	const results = {};
	mergedSchema.forEach((schema) => {
		const { key, items } = schema;
		if (key) {
			const value = getValue(properties, key);
			const error = validateValue(schema, value, properties, customValidationFn);
			if (error) {
				results[key] = error;
			}
		}
		if (items) {
			const subResults = validateAll(items, properties);
			Object.assign(results, subResults);
		}
	});
	return results;
}

/**
 * Check if a schema value is valid.
 * It is invalid if :
 * - the schema is an invalid field (errors[key] is falsy)
 * - the schema has items (ex: fieldset, tabs, ...), and at least one of them is invalid
 * @param schema The schema
 * @param errors The errors
 * @returns {boolean} true if it is invalid, false otherwise
 */
export default function isValid(schema, errors) {
	const { key, items } = schema;
	if (key && errors[key]) {
		return false;
	}

	if (items) {
		for (const itemSchema of items) {
			if (!isValid(itemSchema, errors)) {
				return false;
			}
		}
	}

	return true;
}
