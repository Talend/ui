import { validate as staticValidate } from 'talend-json-schema-form-core';

import { getValue } from './properties';

/**
 * Validate values.
 * @param schema The merged schema.
 * @param value The value.
 * @param properties The values.
 * @param customValidationFn A custom validation function
 * that is applied on schema.customValidation = true
 * @returns {object} The validation result.
 */
export function validate(schema, value, properties, customValidationFn) {
	const staticResult = staticValidate(schema, value);
	if (staticResult.valid && schema.customValidation && customValidationFn) {
		return customValidationFn(properties, schema, value);
	}
	return staticResult;
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
	const validations = {};
	mergedSchema.forEach((schema) => {
		const { key, items } = schema;
		if (key) {
			const value = getValue(properties, key);
			validations[key] = validate(schema, value, properties, customValidationFn);
		}
		if (items) {
			const subValidations = validateAll(items, properties);
			Object.assign(validations, subValidations);
		}
	});
	return validations;
}

/**
 * Check if a schema value is valid.
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
