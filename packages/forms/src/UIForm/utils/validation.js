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
 * Validate an array
 * @param mergedSchema The array schema
 * @param properties The form data
 * @param customValidationFn A custom validation function
 * that is applied on schema.customValidation = true
 * @returns {object} The validation result
 */
export function validateArray(mergedSchema, properties, customValidationFn) {
	const results = {};
	const { key, items } = mergedSchema;

	// validate array definition, not its sub-items here
	const schemaWithoutItems = {
		...mergedSchema,
		schema: {
			...mergedSchema.schema,
			items: [],
		},
	};
	const value = key && getValue(properties, key);
	const error = validateValue(schemaWithoutItems, value, properties, customValidationFn);
	if (error) {
		results[key] = error;
	}

	// validate each value of the array
	if (value) {
		for (let valueIndex = 0; valueIndex < value.length; valueIndex += 1) {
			// adapt items schema with value index
			const indexedItems = items.map((item) => {
				const indexedKey = [...item.key];
				indexedKey[key.length] = valueIndex;
				return {
					...item,
					key: indexedKey,
				};
			});
			const subResults = validateAll(indexedItems, properties);
			Object.assign(results, subResults);
		}
	}

	return results;
}

/**
 * Validate a simple value or an complex object.
 * @param mergedSchema The schema to validate
 * @param properties The form data
 * @param customValidationFn A custom validation function
 * that is applied on schema.customValidation = true
 * @returns {object} The validation result
 */
export function validateObject(mergedSchema, properties, customValidationFn) {
	const results = {};
	const { key, items } = mergedSchema;

	if (key) {
		const value = getValue(properties, key);
		const error = validateValue(mergedSchema, value, properties, customValidationFn);
		if (error) {
			results[key] = error;
		}
	}
	if (items) {
		const subResults = validateAll(items, properties);
		Object.assign(results, subResults);
	}

	return results;
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
		if (schema.type === 'array') {
			const subResults = validateArray(schema, properties, customValidationFn);
			Object.assign(results, subResults);
		} else {
			const subResults = validateObject(schema, properties, customValidationFn);
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
export function isValid(schema, errors) {
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
